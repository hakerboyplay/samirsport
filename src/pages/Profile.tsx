import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProfile } from '@/hooks/useProfile';
import { User, Phone, MapPin, Mail, Facebook, Instagram, Twitter, Save, Edit2 } from 'lucide-react';

const Profile: React.FC = () => {
  const { language } = useLanguage();
  const { profile, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const fields = [
    { key: 'name', icon: User, labelAr: 'الاسم الكامل', labelEn: 'Full Name', type: 'text' },
    { key: 'phone', icon: Phone, labelAr: 'رقم الهاتف', labelEn: 'Phone Number', type: 'tel' },
    { key: 'email', icon: Mail, labelAr: 'البريد الإلكتروني', labelEn: 'Email', type: 'email' },
    { key: 'address', icon: MapPin, labelAr: 'العنوان', labelEn: 'Address', type: 'text' },
    { key: 'facebook', icon: Facebook, labelAr: 'فيسبوك', labelEn: 'Facebook', type: 'url' },
    { key: 'instagram', icon: Instagram, labelAr: 'انستغرام', labelEn: 'Instagram', type: 'url' },
    { key: 'twitter', icon: Twitter, labelAr: 'تويتر', labelEn: 'Twitter', type: 'url' },
  ];

  return (
    <div className="container pb-8 animate-fade-in">
      {/* Header */}
      <div className="bg-card rounded-3xl p-6 shadow-card mb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            {language === 'ar' ? 'حسابي' : 'My Profile'}
          </h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="btn-sport flex items-center gap-2 text-sm py-2 px-4"
            >
              <Edit2 className="w-4 h-4" />
              {language === 'ar' ? 'تعديل' : 'Edit'}
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm border border-border rounded-xl hover:bg-muted transition-colors"
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={handleSave}
                className="btn-sport flex items-center gap-2 text-sm py-2 px-4"
              >
                <Save className="w-4 h-4" />
                {language === 'ar' ? 'حفظ' : 'Save'}
              </button>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 gradient-sport rounded-full flex items-center justify-center shadow-button">
            <User className="w-12 h-12 text-primary-foreground" />
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.key} className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <field.icon className="w-4 h-4" />
                {language === 'ar' ? field.labelAr : field.labelEn}
              </label>
              {isEditing ? (
                <input
                  type={field.type}
                  value={formData[field.key as keyof typeof formData] || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))
                  }
                  className="input-sport w-full"
                  placeholder={language === 'ar' ? field.labelAr : field.labelEn}
                />
              ) : (
                <p className="bg-muted/50 rounded-xl px-4 py-3 text-foreground">
                  {profile[field.key as keyof typeof profile] || (
                    <span className="text-muted-foreground">
                      {language === 'ar' ? 'غير محدد' : 'Not set'}
                    </span>
                  )}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
