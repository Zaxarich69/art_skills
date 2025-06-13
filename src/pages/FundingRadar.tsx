import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import fundersData from '../data/funders.json';

const FundingRadar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTiers, setSelectedTiers] = useState({
    'Tier 1': true,
    'Tier 2': true,
    'Tier 3': true,
  });
  const [selectedTypes, setSelectedTypes] = useState({
    'VC': true,
    'Grants': true,
    'Web3': true,
    'CSR': true,
  });
  const [selectedFunder, setSelectedFunder] = useState(null);
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);

  const handleTierChange = (tier) => {
    setSelectedTiers(prev => ({ ...prev, [tier]: !prev[tier] }));
  };

  const handleTypeChange = (type) => {
    setSelectedTypes(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const filteredFunders = fundersData.filter(funder => {
    const matchesSearch = funder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          funder.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = selectedTiers[funder.tier];
    const matchesType = selectedTypes[funder.type];
    return matchesSearch && matchesTier && matchesType;
  });

  const handleRowClick = (funder) => {
    setSelectedFunder(funder);
    setIsInfoPanelOpen(true);
  };

  const handleExportCSV = () => {
    const headers = ["Name", "Type", "Tier", "Region", "Typical Ticket", "Website", "Description", "Deadline"];
    const rows = filteredFunders.map(funder => [
      funder.name,
      funder.type,
      funder.tier,
      funder.region,
      funder.typicalTicket,
      funder.website,
      `"${funder.description.replace(/"/g, '""')}"`,
      funder.deadline || 'N/A'
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + 
                       headers.join(',') + '\n' + 
                       rows.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "funding_radar.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Main content area */}
      <div className="flex-1 flex flex-col p-6">
        <h1 className="text-3xl font-bold mb-6">Funding Radar</h1>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by name or description..."
            className="flex-1 p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <div className="font-medium">Tier:</div>
            {Object.keys(selectedTiers).map(tier => (
              <label key={tier} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTiers[tier]}
                  onChange={() => handleTierChange(tier)}
                  className="form-checkbox h-4 w-4 text-blue-600 rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <span>{tier}</span>
              </label>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <div className="font-medium">Type:</div>
            {Object.keys(selectedTypes).map(type => (
              <label key={type} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTypes[type]}
                  onChange={() => handleTypeChange(type)}
                  className="form-checkbox h-4 w-4 text-blue-600 rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <DocumentArrowDownIcon className="h-5 w-5" />
            Export CSV
          </button>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Region</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ticket</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredFunders.length > 0 ? (
                filteredFunders.map((funder) => (
                  <tr
                    key={funder.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                    onClick={() => handleRowClick(funder)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{funder.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{funder.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{funder.region}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{funder.typicalTicket}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-300">
                    No funders found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Panel */}
      <Transition.Root show={isInfoPanelOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsInfoPanelOpen(false)}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={React.Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-gray-800 py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            {selectedFunder?.name}
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                              onClick={() => setIsInfoPanelOpen(false)}
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        {selectedFunder && (
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-300">Type: <span className="font-medium">{selectedFunder.type}</span></p>
                              <p className="text-sm text-gray-500 dark:text-gray-300">Tier: <span className="font-medium">{selectedFunder.tier}</span></p>
                              <p className="text-sm text-gray-500 dark:text-gray-300">Region: <span className="font-medium">{selectedFunder.region}</span></p>
                              <p className="text-sm text-gray-500 dark:text-gray-300">Typical Ticket: <span className="font-medium">{selectedFunder.typicalTicket}</span></p>
                            </div>
                            <div>
                              <h3 className="text-md font-medium text-gray-900 dark:text-gray-100">Description</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-300">{selectedFunder.description}</p>
                            </div>
                            {selectedFunder.website && (
                              <div>
                                <h3 className="text-md font-medium text-gray-900 dark:text-gray-100">Website</h3>
                                <a href={selectedFunder.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                                  {selectedFunder.website}
                                </a>
                              </div>
                            )}
                            {selectedFunder.deadline && (
                              <div>
                                <h3 className="text-md font-medium text-gray-900 dark:text-gray-100">Deadline</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-300">{new Date(selectedFunder.deadline).toLocaleDateString()}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default FundingRadar; 