import useLanguage from "../hooks/useLanguage";
import { translations } from "../translations";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsModal = ({ isOpen, onClose }: TermsModalProps) => {
  const { lang } = useLanguage();
  const t = translations[lang];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {t.termsAndConditions}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors text-2xl font-bold w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="prose max-w-none">
            <p className="text-sm text-gray-600 mb-6">{t.termsIntro}</p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              1. {t.generalProvisions}
            </h3>
            <div className="text-sm text-gray-700 space-y-2 mb-4">
              <p>1.1 {t.generalProvisions1}</p>
              <p>1.2 {t.generalProvisions2}</p>
              <p>1.3 {t.generalProvisions3}</p>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              2. {t.carRentalTerms}
            </h3>
            <div className="text-sm text-gray-700 space-y-2 mb-4">
              <p>
                <strong>2.1 {t.eligibility}</strong> {t.eligibilityText}
              </p>
              <p>
                <strong>2.2 {t.mandatoryDocumentation}</strong>{" "}
                {t.mandatoryDocumentationText}
              </p>
              <p>
                <strong>2.3 {t.deposit}</strong> {t.depositText}
              </p>
              <p>
                <strong>2.4 {t.insurance}</strong> {t.insuranceText}
              </p>
              <p>
                <strong>2.5 {t.mileage}</strong> {t.mileageText}
              </p>
              <p>
                <strong>2.6 {t.fuelPolicy}</strong> {t.fuelPolicyText}
              </p>
              <p>
                <strong>2.7 {t.trafficCompliance}</strong>{" "}
                {t.trafficComplianceText}
              </p>
              <p>
                <strong>2.8 {t.policeInteraction}</strong>{" "}
                {t.policeInteractionText}
              </p>
              <p>
                <strong>2.9 {t.liability}</strong> {t.liabilityText}
              </p>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              3. {t.toursExcursions}
            </h3>
            <div className="text-sm text-gray-700 space-y-2 mb-4">
              <p>
                <strong>3.1 {t.tourBooking}</strong> {t.tourBookingText}
              </p>
              <p>
                <strong>3.2 {t.paymentCancellation}</strong>{" "}
                {t.paymentCancellationText}
              </p>
              <p>
                <strong>3.3 {t.guidesItinerary}</strong> {t.guidesItineraryText}
              </p>
              <p>
                <strong>3.4 {t.tourResponsibility}</strong>{" "}
                {t.tourResponsibilityText}
              </p>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              4. {t.hotelsAccommodation}
            </h3>
            <div className="text-sm text-gray-700 space-y-2 mb-4">
              <p>
                <strong>4.1 {t.hotelReservation}</strong>{" "}
                {t.hotelReservationText}
              </p>
              <p>
                <strong>4.2 {t.checkInOut}</strong> {t.checkInOutText}
              </p>
              <p>
                <strong>4.3 {t.hotelCancellation}</strong>{" "}
                {t.hotelCancellationText}
              </p>
              <p>
                <strong>4.4 {t.hotelLiability}</strong> {t.hotelLiabilityText}
              </p>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              5. {t.paymentsDeposit}
            </h3>
            <div className="text-sm text-gray-700 space-y-2 mb-4">
              <p>5.1 {t.paymentsDeposit1}</p>
              <p>5.2 {t.paymentsDeposit2}</p>
              <p>5.3 {t.paymentsDeposit3}</p>
              <p>
                5.4 <strong>{t.paymentsDeposit4}</strong>
              </p>
              <p>5.5 {t.paymentsDeposit5}</p>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              6. {t.liabilityInsurance}
            </h3>
            <div className="text-sm text-gray-700 space-y-2 mb-4">
              <p>6.1 {t.liabilityInsurance1}</p>
              <p>6.2 {t.liabilityInsurance2}</p>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              7. {t.privacyData}
            </h3>
            <div className="text-sm text-gray-700 space-y-2 mb-4">
              <p>7.1 {t.privacyData1}</p>
              <p>7.2 {t.privacyData2}</p>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              8. {t.governingLaw}
            </h3>
            <div className="text-sm text-gray-700 space-y-2 mb-4">
              <p>8.1 {t.governingLaw1}</p>
              <p>8.2 {t.governingLaw2}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-6">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {t.iUnderstandAccept}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
