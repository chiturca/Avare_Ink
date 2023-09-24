import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect } from "react";
import { UserAuth } from "../../api/AuthContext";

export default function CModal() {
  const i = useTranslations("modal");
  const { user } = UserAuth();
  const {
    isOpen: isLoginModalOpen,
    onOpen: openLoginModal,
    onOpenChange: onLoginModalChange,
  } = useDisclosure();

  useEffect(() => {
    if (!user) {
      openLoginModal();
    }
  }, [user, openLoginModal]);
  return (
    <div className="flex justify-center">
      <Modal
        isOpen={isLoginModalOpen}
        onOpenChange={onLoginModalChange}
        className="dark"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {i("ModalHeader")}
              </ModalHeader>
              <ModalBody>
                <p>{i("ModalBody")}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {i("Close")}
                </Button>
                <Link href="/login">
                  <Button color="primary" name="Login">
                    {i("Login")}
                  </Button>
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
