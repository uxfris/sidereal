import { FetchFromLink } from "./_components/fetch-from-link";
import { RecentUploads } from "./_components/recent-uploads";
import { UploadInput } from "./_components/upload-input";

export default function Uploads() {
    return (
        <div className="flex flex-col p-10 gap-8 overflow-y-auto">
            <div className="flex gap-8">
                <UploadInput />
                <FetchFromLink />
            </div>
            <RecentUploads />
        </div>
    )
}