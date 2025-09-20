import { useEffect, useState } from "react";
import { translations } from "../translations";
import useLanguage from "../hooks/useLanguage";

const FAQPage = () => {
  const { lang } = useLanguage();
  const t = translations[lang];
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const toggleItem = (index: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const faqData = [
    {
      category: t.carRentalTerms,
      questions: [
        {
          question: t.faqCarAge,
          answer: t.faqCarAgeAnswer,
        },
        {
          question: t.faqCarDocuments,
          answer: t.faqCarDocumentsAnswer,
        },
        {
          question: t.faqCarDeposit,
          answer: t.faqCarDepositAnswer,
        },
        {
          question: t.faqCarInsurance,
          answer: t.faqCarInsuranceAnswer,
        },
        {
          question: t.faqCarMileage,
          answer: t.faqCarMileageAnswer,
        },
        {
          question: t.faqCarFuel,
          answer: t.faqCarFuelAnswer,
        },
      ],
    },
    {
      category: t.toursExcursions,
      questions: [
        {
          question: t.faqTourBooking,
          answer: t.faqTourBookingAnswer,
        },
        {
          question: t.faqTourCancellation,
          answer: t.faqTourCancellationAnswer,
        },
        {
          question: t.faqTourGuide,
          answer: t.faqTourGuideAnswer,
        },
        {
          question: t.faqTourWeather,
          answer: t.faqTourWeatherAnswer,
        },
      ],
    },
    {
      category: t.hotelsAccommodation,
      questions: [
        {
          question: t.faqHotelAvailability,
          answer: t.faqHotelAvailabilityAnswer,
        },
        {
          question: t.faqHotelCheckIn,
          answer: t.faqHotelCheckInAnswer,
        },
        {
          question: t.faqHotelCancellation,
          answer: t.faqHotelCancellationAnswer,
        },
      ],
    },
    {
      category: t.paymentsDeposit,
      questions: [
        {
          question: t.faqPaymentCurrency,
          answer: t.faqPaymentCurrencyAnswer,
        },
        {
          question: t.faqPaymentMethods,
          answer: t.faqPaymentMethodsAnswer,
        },
        {
          question: t.faqRefunds,
          answer: t.faqRefundsAnswer,
        },
      ],
    },
    {
      category: t.generalQuestions,
      questions: [
        {
          question: t.faqInsuranceRecommend,
          answer: t.faqInsuranceRecommendAnswer,
        },
        {
          question: t.faqPrivacy,
          answer: t.faqPrivacyAnswer,
        },
        {
          question: t.faqContact,
          answer: t.faqContactAnswer,
        },
      ],
    },
  ];

  let itemIndex = 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {t.faqTitle}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.faqDescription}
          </p>
        </div>

        <div className="space-y-8">
          {faqData.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="bg-blue-600 text-white px-6 py-4">
                <h2 className="text-xl font-semibold">{category.category}</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {category.questions.map((item, questionIndex) => {
                  const currentIndex = itemIndex++;
                  const isOpen = openItems[currentIndex];

                  return (
                    <div key={questionIndex}>
                      <button
                        onClick={() => toggleItem(currentIndex)}
                        className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-50"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium text-gray-800 pr-4">
                            {item.question}
                          </h3>
                          <span className="text-2xl text-gray-500 flex-shrink-0 transition-transform duration-200">
                            {isOpen ? "−" : "+"}
                          </span>
                        </div>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <div className="text-gray-600 leading-relaxed">
                            {item.answer}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {t.faqStillHaveQuestions}
            </h3>
            <p className="text-gray-600 mb-4">{t.faqContactUs}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+995597561305"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                📞 +995 597 56 13 05
              </a>
              <a
                href="mailto:MahoTravel@gmail.com"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                ✉️ MahoTravel@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
