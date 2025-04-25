 
import { Doctor } from '../types/doctor';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <div data-testid="doctor-card" className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h2 data-testid="doctor-name" className="text-xl font-semibold mb-2">{doctor.name}</h2>
      <p data-testid="doctor-specialty" className="text-gray-600 mb-2">
        {doctor.speciality && doctor.speciality.length > 0 
          ? doctor.speciality.join(", ")
          : "No specialties listed"}
      </p>
      <div className="flex justify-between items-center mt-4">
        <span data-testid="doctor-experience" className="text-gray-700">
          {doctor.experience} years exp.
        </span>
        <span data-testid="doctor-fee" className="text-purple-600 font-semibold">
          ₹{doctor.fee}
        </span>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        Available for: {[
          doctor.video && 'Video Consult',
          doctor.clinic && 'In Clinic'
        ].filter(Boolean).join(', ')}
      </div>
    </div>
  );
};

export default DoctorCard;
