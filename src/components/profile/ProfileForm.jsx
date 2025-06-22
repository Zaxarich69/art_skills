import React, { useState, useEffect } from 'react'; 
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Edit, Save, PlusCircle, Trash2 } from 'lucide-react';

const emptyEducation = { degree: '', institution: '', year: '' };
const emptyCertification = { name: '' };
const emptySocialLinks = { website: '', linkedin: '', twitter: '', instagram: '', facebook: '' };

const ProfileForm = ({ userData, onSave, isEditing, onEditToggle, categories }) => {
  const [localFormData, setLocalFormData] = useState(userData);

  useEffect(() => {
    setLocalFormData(userData);
  }, [userData]);

  // --- HANDLERS ---

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSelectChange = (value) => {
    setLocalFormData(prevData => ({
      ...prevData,
      category: value
    }));
  };

  // --- EDUCATION ---
  const handleEducationChange = (idx, field, value) => {
    setLocalFormData(prevData => {
      const updated = [...(prevData.education || [])];
      updated[idx][field] = value;
      return { ...prevData, education: updated };
    });
  };
  const addEducation = () => {
    setLocalFormData(prevData => ({
      ...prevData,
      education: [...(prevData.education || []), { ...emptyEducation }]
    }));
  };
  const removeEducation = (idx) => {
    setLocalFormData(prevData => ({
      ...prevData,
      education: prevData.education.filter((_, i) => i !== idx)
    }));
  };

  // --- CERTIFICATIONS ---
  const handleCertChange = (idx, value) => {
    setLocalFormData(prevData => {
      const updated = [...(prevData.certifications || [])];
      updated[idx].name = value;
      return { ...prevData, certifications: updated };
    });
  };
  const addCertification = () => {
    setLocalFormData(prevData => ({
      ...prevData,
      certifications: [...(prevData.certifications || []), { ...emptyCertification }]
    }));
  };
  const removeCertification = (idx) => {
    setLocalFormData(prevData => ({
      ...prevData,
      certifications: prevData.certifications.filter((_, i) => i !== idx)
    }));
  };

  // --- SOCIAL LINKS ---
  const handleSocialChange = (field, value) => {
    setLocalFormData(prevData => ({
      ...prevData,
      socialLinks: { ...prevData.socialLinks, [field]: value }
    }));
  };

  // --- SUBMIT ---
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(localFormData);
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Personal Information</CardTitle>
        <Button 
          onClick={() => {
            if (isEditing) {
              handleSubmit(new Event('submit'));
            }
            onEditToggle();
          }}
          className="flex items-center gap-2"
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4" />
              Save
            </>
          ) : (
            <>
              <Edit className="h-4 w-4" />
              Edit
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={localFormData.name || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={localFormData.email || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={localFormData.phone || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={localFormData.location || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bio">About Me</Label>
            <Input
              id="bio"
              name="bio"
              value={localFormData.bio || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="title">Title/Profession</Label>
            <Input
              id="title"
              name="title"
              value={localFormData.title || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select 
              onValueChange={handleSelectChange}
              value={localFormData.category || ''}
              disabled={!isEditing}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="hourlyRate">Hourly Rate</Label>
            <Input
              id="hourlyRate"
              name="hourlyRate"
              type="number"
              value={localFormData.hourlyRate || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {/* EDUCATION */}
          <div>
            <Label>Education</Label>
            {(localFormData.education || []).map((edu, idx) => (
              <div key={idx} className="flex gap-2 items-center mb-2">
                <Input
                  className="flex-1"
                  placeholder="Degree"
                  value={edu.degree}
                  disabled={!isEditing}
                  onChange={e => handleEducationChange(idx, 'degree', e.target.value)}
                />
                <Input
                  className="flex-1"
                  placeholder="Institution"
                  value={edu.institution}
                  disabled={!isEditing}
                  onChange={e => handleEducationChange(idx, 'institution', e.target.value)}
                />
                <Input
                  className="w-24"
                  placeholder="Year"
                  value={edu.year}
                  disabled={!isEditing}
                  onChange={e => handleEducationChange(idx, 'year', e.target.value)}
                />
                {isEditing && (
                  <Button type="button" size="icon" variant="ghost" onClick={() => removeEducation(idx)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                )}
              </div>
            ))}
            {isEditing && (
              <Button type="button" variant="outline" size="sm" onClick={addEducation} className="mt-1">
                <PlusCircle className="h-4 w-4 mr-1" />
                Add education
              </Button>
            )}
          </div>

          {/* CERTIFICATIONS */}
          <div>
            <Label>Certifications</Label>
            {(localFormData.certifications || []).map((cert, idx) => (
              <div key={idx} className="flex gap-2 items-center mb-2">
                <Input
                  className="flex-1"
                  placeholder="Certification name"
                  value={cert.name}
                  disabled={!isEditing}
                  onChange={e => handleCertChange(idx, e.target.value)}
                />
                {isEditing && (
                  <Button type="button" size="icon" variant="ghost" onClick={() => removeCertification(idx)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                )}
              </div>
            ))}
            {isEditing && (
              <Button type="button" variant="outline" size="sm" onClick={addCertification} className="mt-1">
                <PlusCircle className="h-4 w-4 mr-1" />
                Add certificate
              </Button>
            )}
          </div>

          {/* SOCIAL LINKS */}
          <div>
            <Label>Social Links</Label>
            <div className="grid gap-2">
              {['website', 'linkedin', 'twitter', 'instagram', 'facebook'].map(field => (
                <Input
                  key={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={localFormData.socialLinks?.[field] || ''}
                  disabled={!isEditing}
                  onChange={e => handleSocialChange(field, e.target.value)}
                />
              ))}
            </div>
          </div>

        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
