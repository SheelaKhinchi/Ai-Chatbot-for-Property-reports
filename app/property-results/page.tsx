import { Suspense } from 'react';
import PropertyResult from './PropertyResult'; // Update the import to use PropertyResult

const Page = () => {
    return (
        <div>
            <Suspense fallback={<p>Loading property details...</p>}>
                <PropertyResult />
            </Suspense>
        </div>
    );
};

export default Page;
