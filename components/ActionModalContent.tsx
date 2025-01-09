import { convertFileSize, formatDateTime } from "@/lib/utils";
import FormattedDateTime from "./FormattedDateTime"
import Thumbnail from "./Thumbnail"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import getFileUsers from "@/actions/getFileUsers";

const ImageThumbnail = ({ file }) => {
    return <div className="file-details-thumbnail">
        <Thumbnail type={file.type} extension={file.extension} url={file.url} />
        <div className="flex flex-col">
            <p className="subtitle-2 mb-1">{file.name}</p>
            <FormattedDateTime date={file.createdAt} className="caption" />
        </div>
    </div>
}

const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex">
        <p className="file-details-label text-left">{label}</p>
        <p className="file-details-value text-left">{value}</p>
    </div>
);

export const FileDetails = ({ file }) => {

    return <>
        <ImageThumbnail file={file} />
        <DetailRow label="Format:" value={file.extension} />
        <DetailRow label="Size:" value={convertFileSize(file.size)} />
        <DetailRow label="Owner:" value={file.owner.name} />
        <DetailRow label="Last edit:" value={formatDateTime(file.updatedAt)} />
    </>
}


interface Props {
    file: any,
    onInputChange: React.Dispatch<React.SetStateAction<string[]>>,
    onRemove: (userId: string, email: string) => void
}

export const ShareInput = ({ file, onInputChange, onRemove }: Props) => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const getFilesHere = async () => {
            const fetchedData = await getFileUsers(file.id);
            setFiles(fetchedData);
        }

        getFilesHere();
    }, [])


    return (
        <>
            <ImageThumbnail file={file} />

            <div className="share-wrapper">
                <p className="subtitle-2 pl-1 font-normal">Share file with other user</p>
                <Input
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => onInputChange(e.target.value.trim().split(","))}
                    className="share-input-field"
                />

                <div className="pt-4">
                    <div className="flex justify-between">
                        <p className="subtitle-2 font-thin">Share with</p>
                        {/* TODO: */}
                        <p className="subtitle-2 font-normal">{files.length} users</p>

                    </div>
                    <ul className="pt-2">
                        {files.map((item) => {
                            return (
                                <li key={item.user.id} className="flex items-center justify-between gap-2">
                                    <p className="subtitle-2">{item.user.email}</p>
                                    <Button variant={"ghost"} onClick={() => onRemove(item.user.id, item.user.email)}>
                                        <Image
                                            src="/assets/icons/remove.svg"
                                            alt="remove"
                                            width={20}
                                            height={20}
                                            className="remove-icon"
                                        />
                                    </Button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}