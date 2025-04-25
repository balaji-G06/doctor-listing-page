 
import React from 'react';
import { Filter } from 'lucide-react';
import { ChevronDown } from 'lucide-react';

interface FilterPanelProps {
  specialties: string[];
  selectedSpecialties: string[];
  consultationType: string;
  sortBy: string;
  onSpecialtyChange: (specialty: string) => void;
  onConsultationTypeChange: (type: string) => void;
  onSortChange: (sort: string) => void;
}

const FilterPanel = ({
  specialties,
  selectedSpecialties,
  consultationType,
  sortBy,
  onSpecialtyChange,
  onConsultationTypeChange,
  onSortChange,
}: FilterPanelProps) => {
  // Ensure specialty IDs match exactly with requirements
  const getSpecialtyTestId = (specialty: string) => {
    return `filter-specialty-${specialty.split('/').join('-')}`;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="mb-6">
        <h3 data-testid="filter-header-sort" className="text-lg font-semibold mb-3 flex items-center justify-between">
          Sort By <ChevronDown className="w-5 h-5 text-gray-500" />
        </h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              data-testid="sort-fees"
              checked={sortBy === 'fees'}
              onChange={() => onSortChange('fees')}
              className="form-radio text-blue-600"
            />
            <span>Price (Low-High)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              data-testid="sort-experience"
              checked={sortBy === 'experience'}
              onChange={() => onSortChange('experience')}
              className="form-radio text-blue-600"
            />
            <span>Experience (Most Experienced first)</span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <h3 data-testid="filter-header-moc" className="text-lg font-semibold mb-3 flex items-center justify-between">
          Mode of Consultation <ChevronDown className="w-5 h-5 text-gray-500" />
        </h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              data-testid="filter-video-consult"
              checked={consultationType === 'video'}
              onChange={() => onConsultationTypeChange('video')}
              className="form-radio text-blue-600"
            />
            <span>Video Consultation</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              data-testid="filter-in-clinic"
              checked={consultationType === 'clinic'}
              onChange={() => onConsultationTypeChange('clinic')}
              className="form-radio text-blue-600"
            />
            <span>In-Clinic Consultation</span>
          </label>
        </div>
      </div>

      <div>
        <h3 data-testid="filter-header-speciality" className="text-lg font-semibold mb-3 flex items-center justify-between">
          Specialities <ChevronDown className="w-5 h-5 text-gray-500" />
        </h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {specialties.map((specialty) => (
            <label key={specialty} className="flex items-center space-x-2">
              <input
                type="checkbox"
                data-testid={getSpecialtyTestId(specialty)}
                checked={selectedSpecialties.includes(specialty)}
                onChange={() => onSpecialtyChange(specialty)}
                className="form-checkbox text-blue-600"
              />
              <span>{specialty}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
