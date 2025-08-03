interface AdditionalDetailsProps {
    sizeMaterial: string;
    care: string;
    shippingFormat: string;
    returns: string;
}

export const AdditionalDetails = ({
    sizeMaterial,
    care,
    shippingFormat,
    returns
}: AdditionalDetailsProps) => {
  return (
        <div className='space-y-4'>
            <h2 className='text-3xl font-bold text-[#362925]'>Additional Details</h2>
            <div className='bg-[#DED6C0] border-t border-b border-[#8B8678]'>
                <div className='flex justify-between py-4 px-6 border-b border-[#8B8678]'>
                    <span className='text-xl'>Size / Material:</span>
                    <span className='text-xl'>{sizeMaterial}</span>
                </div>
                <div className='flex justify-between py-4 px-6 border-b border-[#8B8678]'>
                    <span className='text-xl'>Care:</span>
                    <span className='text-xl'>{care}</span>
                </div>
                <div className='flex justify-between py-4 px-6 border-b border-[#8B8678]'>
                    <span className='text-xl'>Shipping Format:</span>
                    <span className='text-xl'>{shippingFormat}</span>
                </div>
                <div className='flex justify-between py-4 px-6'>
                    <span className='text-xl'>Returns:</span>
                    <span className='text-xl'>{returns}</span>
                </div>
            </div>
        </div>
  );
}; 