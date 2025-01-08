import Link from 'next/link'
import Thumbnail from './Thumbnail'
import { convertFileSize } from '@/lib/utils'
import FormattedDateTime from './FormattedDateTime'
import ActionDropdown from './ActionDropdown'

const Card = ({ file }) => {

    return (
        <Link href={file.url} target="_blank" className="file-card">
            <div className="flex jusitfy-between">
                <Thumbnail
                    type={file.type}
                    extension={file.extension}
                    url={file.url}
                    className="!size-20"
                    imageClassName="!size-11"
                />

                <div className="flex flex-col items-end justify-between">
                    <ActionDropdown file={file} />

                    <p className='body-1'>
                        {convertFileSize(file.size)}
                    </p>
                </div>
            </div>

            <div className="file-card-details">
                <p className="subtitle-2 line-clamp-1">
                    {file.name}
                </p>
                <FormattedDateTime date={file.createdAt} className={"body-2 font-light"} />
                <p className="caption line-clamp-1 font-light">
                    By: {file.owner.name}
                </p>
            </div>

        </Link>
    )
}

export default Card