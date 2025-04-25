import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchDoctors } from '../services/api';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import DoctorCard from '../components/DoctorCard';
import { Doctor } from '../types/doctor';

const Index = () => {
  console.log("Index component rendering");

  const [searchParams, setSearchParams] = useSearchParams();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
    searchParams.get('specialties')?.split(',').filter(Boolean) || []
  );
  const [consultationType, setConsultationType] = useState(searchParams.get('consultation') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || '');

  // Fetch doctors data
  useEffect(() => {
    const loadDoctors = async () => {
      console.log("Fetching doctors...");
      try {
        const data = await fetchDoctors();
        console.log("Doctors fetched:", data);
        setDoctors(data);
        setFilteredDoctors(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
        setError('Failed to load doctors');
        setLoading(false);
      }
    };
    loadDoctors();
  }, []);

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedSpecialties.length) params.set('specialties', selectedSpecialties.join(','));
    if (consultationType) params.set('consultation', consultationType);
    if (sortBy) params.set('sort', sortBy);
    setSearchParams(params);
  }, [searchQuery, selectedSpecialties, consultationType, sortBy, setSearchParams]);

  // Apply filters
  useEffect(() => {
    console.log("Applying filters. Dependencies:", { doctors, searchQuery, selectedSpecialties, consultationType, sortBy });
    let filtered = [...doctors];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply specialty filter
    if (selectedSpecialties.length > 0) {
      filtered = filtered.filter(doctor =>
        // Add null/undefined check before using .some()
        doctor.speciality && Array.isArray(doctor.speciality) && 
        doctor.speciality.some(s => selectedSpecialties.includes(s))
      );
    }

    // Apply consultation type filter
    if (consultationType) {
      filtered = filtered.filter(doctor =>
        consultationType === 'video' ? doctor.video : doctor.clinic
      );
    }

    // Apply sorting
    if (sortBy) {
      filtered.sort((a, b) => {
        if (sortBy === 'fees') {
          return a.fee - b.fee;
        } else if (sortBy === 'experience') {
          return b.experience - a.experience;
        }
        return 0;
      });
    }

    setFilteredDoctors(filtered);
    console.log("Filtered doctors:", filtered);
  }, [doctors, searchQuery, selectedSpecialties, consultationType, sortBy]);

  // Get unique specialties from doctors
  const allSpecialties = Array.from(
    new Set(doctors.flatMap(doctor => doctor.speciality || []))
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSpecialtyChange = (specialty: string) => {
    setSelectedSpecialties(prev =>
      prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  };

  console.log("Render state:", { loading, error });

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  console.log("Rendering main content with doctors:", filteredDoctors);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto">
        <div className="mb-8">
          <SearchBar doctors={doctors} onSearch={handleSearch} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <FilterPanel
              specialties={allSpecialties}
              selectedSpecialties={selectedSpecialties}
              consultationType={consultationType}
              sortBy={sortBy}
              onSpecialtyChange={handleSpecialtyChange}
              onConsultationTypeChange={setConsultationType}
              onSortChange={setSortBy}
            />
          </div>
          
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDoctors.map((doctor, index) => (
                <DoctorCard key={index} doctor={doctor} />
              ))}
            </div>
            {filteredDoctors.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No doctors found matching your criteria
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
