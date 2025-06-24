import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { X, Plus } from 'lucide-react';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const AvailabilityBlock = ({ availability = {}, onSave }) => {
  const [localAvailability, setLocalAvailability] = useState(availability);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');

  useEffect(() => {
    setLocalAvailability(availability);
  }, [availability]);

  const addTimeSlot = () => {
    if (startTime && endTime && startTime < endTime) {
      const newSlot = `${startTime} - ${endTime}`;
      setLocalAvailability(prev => ({
        ...prev,
        [selectedDay]: [...(prev[selectedDay] || []), newSlot]
      }));
      setStartTime('09:00');
      setEndTime('17:00');
    }
  };

  const removeTimeSlot = (day, index) => {
    setLocalAvailability(prev => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    onSave?.(localAvailability);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalAvailability(availability);
    setIsEditing(false);
  };

  return (
    <div className="availability-block w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-zinc-900 text-xl font-semibold">Availability Schedule</h3>
        {!isEditing && (
          <Button 
            onClick={() => setIsEditing(true)}
            className="bg-[#715bf7] hover:bg-[#5d4bd4] text-white"
          >
            Edit Schedule
          </Button>
        )}
      </div>

      {/* Schedule Display - без карточек и бордеров */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 mb-6">
        {daysOfWeek.map(day => (
          <div key={day} className="">
            <div className="font-semibold text-zinc-900 mb-1">{day}</div>
            <div className="space-y-1">
              {localAvailability[day]?.length ? (
                localAvailability[day].map((slot, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Badge className="bg-[#f3f3fa] text-zinc-900 border-0">
                      {slot}
                    </Badge>
                    {isEditing && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeTimeSlot(day, idx)}
                        className="h-6 w-6 p-0 text-zinc-500 hover:text-zinc-900"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))
              ) : (
                <span className="text-zinc-400 text-sm">No availability</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Time Slot Form */}
      {isEditing && (
        <div className="mb-6">
          <h4 className="text-zinc-900 font-medium mb-4">Add New Time Slot</h4>
          <div className="flex flex-wrap items-center gap-3">
            <select 
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="bg-white text-zinc-900 border border-zinc-300 rounded px-3 py-2 focus:outline-none focus:border-[#715bf7]"
            >
              {daysOfWeek.map(day => (
                <option key={day} value={day} className="bg-white text-zinc-900">
                  {day}
                </option>
              ))}
            </select>
            
            <input 
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="bg-white text-zinc-900 border border-zinc-300 rounded px-3 py-2 focus:outline-none focus:border-[#715bf7]"
            />
            
            <span className="text-zinc-400">to</span>
            
            <input 
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="bg-white text-zinc-900 border border-zinc-300 rounded px-3 py-2 focus:outline-none focus:border-[#715bf7]"
            />
            
            <Button 
              onClick={addTimeSlot}
              className="bg-[#715bf7] hover:bg-[#5d4bd4] text-white"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Slot
            </Button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {isEditing && (
        <div className="flex gap-3 justify-end">
          <Button 
            onClick={handleCancel}
            className="bg-zinc-200 hover:bg-zinc-300 text-zinc-900"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-[#715bf7] hover:bg-[#5d4bd4] text-white"
          >
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
};

export default AvailabilityBlock; 