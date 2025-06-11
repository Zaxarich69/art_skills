import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Settings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Настройки профиля</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode">Темная тема</Label>
            <Switch id="dark-mode" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email-notifications">Email уведомления</Label>
            <Input id="email-notifications" defaultValue="alex.morozov@example.com" type="email" />
          </div>
          <Button>Сохранить настройки</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings; 