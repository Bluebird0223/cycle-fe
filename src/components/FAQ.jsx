import React, { useState } from 'react';

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle active state
  };

  const accordionItems = [
    {
      title: 'Accordion Item #1',
      content:
        'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.',
    },
    {
      title: 'Accordion Item #2',
      content:
        'Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.',
    },
    {
      title: 'Accordion Item #3',
      content:
        'Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably have not heard of them accusamus labore sustainable VHS.',
    },
  ];

  return (
    <div className="bg-white p-4 mt-6 rounded-lg shadow-md">
    <div className="accordion-container max-w-xl mx-auto mt-5 border rounded-lg shadow-md">
      {accordionItems.map((item, index) => (
        <div key={index} className="accordion-item border-b">
          {/* Accordion Header */}
          <div
            className="accordion-header flex justify-between items-center p-4 cursor-pointer"
            onClick={() => toggleAccordion(index)}
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            {/* Toggle Arrow */}
            <span
              className={`text-xl transform transition-transform duration-300 ${
                activeIndex === index ? 'rotate-180' : 'rotate-0'
              }`}
            >
              ▼
            </span>
          </div>
          {/* Accordion Content */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              activeIndex === index ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="p-4 bg-gray-50" >{item.content}</div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Accordion;
