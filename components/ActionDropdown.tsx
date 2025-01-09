"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { useState } from "react";
import Image from "next/image";
import { actionsDropdownItems } from "@/constants";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { FileDetails, ShareInput } from "./ActionModalContent";
import addFileUsers from "@/actions/addFileUsers";
import removeFileUser from "@/actions/removeFileUser";
import deleteFile from "@/actions/deleteFile";


const ActionDropdown = ({ file }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [name, setName] = useState(file.name);
  const [isLoading, setIsLoading] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);
  const path = usePathname();

  const closeAllModal = () => {
    setIsDropdownOpen(false);
    setIsModalOpen(false);
    setAction(null);
    setName(file.name);
    //setEmail([]);
  }

  const handleAction = async () => {
    if (!action) return;
    setIsLoading(true);
    let success = false;

    const actions = {
      // rename: () => renameFile(file.id, file.name, file.extension, path),
      share: () => addFileUsers(file.id, emails),
      delete: () => deleteFile(file.id),
    }

    success = await actions[action.value as keyof typeof actions]();

    if (success) closeAllModal();

    setIsLoading(false);
  }

  const handleRemoveUser = async (userId: string, email: string) => {
    const updatedEmails = emails.filter((e) => e !== email);
    console.log("updatedEmails: ", updatedEmails);

    const success = await removeFileUser(userId, file.id);
    if (success) setEmails(updatedEmails);
    closeAllModal();
  }

  const renderDialogContent = () => {
    if (!action) return;

    const { value, label } = action;
    return (
      <DialogContent className="shad-dialog button">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-center font-normal">
            {label}
          </DialogTitle>
          {value === "rename" && (
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          {value === "details" && <FileDetails file={file} />}
          {value === "share" && <ShareInput file={file} onInputChange={setEmails} onRemove={handleRemoveUser} />}
          {value === "delete" && (
            <p className="delete-confirmation">
              Are you sure you want to delete {` `}
              <span className="text-slate-500">{file.name}</span>?
            </p>
          )}
        </DialogHeader>

        {["rename", "delete", "share"].includes(value) && (
          <DialogFooter className="flex flex-col gap-3 md:flex-row">
            <Button onClick={closeAllModal} className="modal-cancel-button text-slate-600">
              Cancel
            </Button>
            <Button onClick={handleAction} className="modal-submit-button">
              <p className="capitalize">{value}</p>
              {isLoading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="spinner"
                  width={20}
                  height={20}
                  className="animate-spin"
                />
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    )
  }

  return <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger className="shad-no-focus">
        <Image
          src="/assets/icons/dots.svg"
          alt="dots"
          width={30}
          height={30}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="max-w-[200px] truncate">{file.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {actionsDropdownItems.map((actionItem) => (
          <DropdownMenuItem
            key={actionItem.value}
            className="shad-dropdown-item"
            onClick={() => {
              setAction(actionItem);

              if (["rename", "share", "delete", "details"].includes(actionItem.value)) {
                setIsModalOpen(true);
              }
            }}
          >

            {actionItem.value === "download" ? (
              <a href={file.url} download={file.name} className="flex items-center gap-2">
                <Image
                  src={actionItem.icon}
                  alt={actionItem.label}
                  width={20}
                  height={20}
                />
                {actionItem.label}
              </a>
            ) : (
              <div className="flex items-center gap-2">
                <Image
                  src={actionItem.icon}
                  alt={actionItem.label}
                  width={20}
                  height={20}
                />
                {actionItem.label}
              </div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>

    {renderDialogContent()}
  </Dialog>

}

export default ActionDropdown