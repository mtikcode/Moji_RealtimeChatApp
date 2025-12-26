import type { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import ProfileCard from "./ProfileCard";
import { useAuthStore } from "@/stores/useAuthStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import PersonalInfoForm from "./PersonalInfoForm";
import PreferencesForm from "./PreferencesForm";
import PrivacySettings from "./PrivacySettings";

interface ProfileDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ProfileDialog = ({ open, setOpen }: ProfileDialogProps) => {
  const { user } = useAuthStore();
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent className="overflow-y-auto max-h-[95vh] p-0 bg-transparent border-0 shadow-2xl">
        <div className="bg-gradient-glass">
          <div className="max-w-4xl mx-auto p-4">
            {/* heading */}
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold text-foreground">
                Profile & Settings
              </DialogTitle>
            </DialogHeader>

            <ProfileCard user={user} />

            <Tabs
              defaultValue="personal"
              className="my-4"
            >
              <TabsList className="grid w-full grid-cols-3 glass-light">
                <TabsTrigger
                  value="personal"
                  className="data-[state=active]:glass-strong"
                >
                  Tài Khoản
                </TabsTrigger>
                <TabsTrigger
                  value="preferences"
                  className="data-[state=active]:glass-strong"
                >
                  Cấu Hình
                </TabsTrigger>
                <TabsTrigger
                  value="privacy"
                  className="data-[state=active]:glass-strong"
                >
                  Bảo Mật
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <PersonalInfoForm userInfo={user} />
              </TabsContent>

              <TabsContent value="preferences">
                <PreferencesForm />
              </TabsContent>

              <TabsContent value="privacy">
                <PrivacySettings />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
