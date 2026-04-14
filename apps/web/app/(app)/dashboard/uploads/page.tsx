import { FetchFromLink } from "./_components/fetch-from-link";
import { RecentUploads } from "./_components/recent-uploads";
import { UploadInput } from "./_components/upload-input";

export default function Uploads() {
    return (
        <div className="flex flex-col px-4 pt-0 pb-12 md:p-10 gap-8 overflow-y-auto">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <UploadInput />
                <FetchFromLink />
            </div>
            <RecentUploads />
        </div>
    )
}