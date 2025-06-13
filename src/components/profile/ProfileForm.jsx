import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Edit, Save } from 'lucide-react';

const ProfileForm = ({ userData, onSave, isEditing, onEditToggle, categories }) => {
  const [localFormData, setLocalFormData] = useState(userData);

  useEffect(() => {
    setLocalFormData(userData);
  }, [userData]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(localFormData);
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Личная информация</CardTitle>
        <Button 
          onClick={() => {
            if (isEditing) {
              handleSubmit(new Event('submit')); // Manually trigger submit for form data
            }
            onEditToggle();
          }}
          className="flex items-center gap-2"
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4" />
              Сохранить
            </>
          ) : (
            <>
              <Edit className="h-4 w-4" />
              Редактировать
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Имя</Label>
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
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              name="phone"
              value={localFormData.phone || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Местоположение</Label>
            <Input
              id="location"
              name="location"
              value={localFormData.location || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bio">О себе</Label>
            <Input
              id="bio"
              name="bio"
              value={localFormData.bio || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="title">Должность/Профессия</Label>
            <Input
              id="title"
              name="title"
              value={localFormData.title || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Категория</Label>
            <Select 
              onValueChange={handleSelectChange}
              value={localFormData.category || ''}
              disabled={!isEditing}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выберите категорию" />
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
            <Label htmlFor="hourlyRate">Почасовая ставка</Label>
            <Input
              id="hourlyRate"
              name="hourlyRate"
              type="number"
              value={localFormData.hourlyRate || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
