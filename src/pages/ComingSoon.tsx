import { SubTitle, Text } from '../components/ui/Text';
import { useEffect, useRef } from 'react';

const ComingSoon = () => {
    const formRef = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://f.convertkit.com/ckjs/ck.5.js';
        script.async = true;
        document.body.appendChild(script);

        // Handler for form submit
        const handleNativeSubmit = (e: Event) => {
            console.log('ConvertKit form submitted! (native event)');
            // You can add more actions here
            // Trigger PDF download
            const link = document.createElement('a');
            link.href = '/assets/ZenShift_5D_Home_Starter_Pack_Final_Printable.pdf';
            link.download = 'ZenShift_5D_Home_Starter_Pack_Final_Printable.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        // Attach event listener after script loads
        script.onload = () => {
            if (formRef.current) {
                formRef.current.addEventListener('submit', handleNativeSubmit);
            }
        };

        return () => {
            document.body.removeChild(script);
            if (formRef.current) {
                formRef.current.removeEventListener('submit', handleNativeSubmit);
            }
        };
    }, []);

    return (
        <div className='min-h-screen coming-soon w-full flex justify-center items-center'>
            <div>
                <SubTitle className='text-white text-center mb-6 md:mb-12'>
                    The Portal <br /> Is Opening Soon
                </SubTitle>

                <Text className='text-white text-center mb-6 md:mb-12'>
                    You've felt this coming.
                    <br />
                    Now's the time to enter the field.
                </Text>

                <div className='flex justify-center'>
                    <form
                        ref={formRef}
                        action="https://app.kit.com/forms/8250927/subscriptions"
                        className="seva-form formkit-form"
                        method="post"
                        data-sv-form="8250927"
                        data-uid="b63ac9a544"
                        data-format="inline"
                        data-version="5" data-options="{&quot;settings&quot;:{&quot;after_subscribe&quot;:{&quot;action&quot;:&quot;message&quot;,&quot;success_message&quot;:&quot;Success! Now check your email to confirm your subscription. Please check our free Zenshift EBook.&quot;,&quot;redirect_url&quot;:&quot;&quot;},&quot;analytics&quot;:{&quot;google&quot;:null,&quot;fathom&quot;:null,&quot;facebook&quot;:null,&quot;segment&quot;:null,&quot;pinterest&quot;:null,&quot;sparkloop&quot;:null,&quot;googletagmanager&quot;:null},&quot;modal&quot;:{&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15},&quot;powered_by&quot;:{&quot;show&quot;:true,&quot;url&quot;:&quot;https://kit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic&quot;},&quot;recaptcha&quot;:{&quot;enabled&quot;:false},&quot;return_visitor&quot;:{&quot;action&quot;:&quot;show&quot;,&quot;custom_content&quot;:&quot;&quot;},&quot;slide_in&quot;:{&quot;display_in&quot;:&quot;bottom_right&quot;,&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15},&quot;sticky_bar&quot;:{&quot;display_in&quot;:&quot;top&quot;,&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15}},&quot;version&quot;:&quot;5&quot;}" min-width="400 500 600 700 800"
                    >
                        <div data-style="clean">
                            <ul className="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul>
                            <div data-element="fields" data-stacked="false" className="seva-fields formkit-fields">
                            <div className="formkit-field">
                                <input
                                    className="formkit-input"
                                    name="email_address"
                                    aria-label="Email Address"
                                    placeholder="Email Address"
                                    required
                                    type="email"
                                    style={{ color: 'rgb(0, 0, 0)', borderColor: 'rgb(227, 227, 227)', borderRadius: '4px', fontWeight: '400', }} 
                                />
                            </div>
                            <button
                                data-element="submit"
                                className="formkit-submit formkit-submit"
                                style={{ color: 'rgb(255, 255, 255)', backgroundColor: 'rgb(22, 119, 190)', borderRadius: '4px', fontWeight: '400', }}>
                                <div className="formkit-spinner">
                                <div></div>
                                <div></div>
                                <div></div>
                                </div>
                                <span className="">Subscribe</span>
                            </button>
                            </div>
                        </div>
                    </form>
                </div>

                <Text className='text-white text-center'>
                    You'll be the first to know
                    <br />
                    when the portal opens
                </Text>
            </div>
        </div>
    );
}

export default ComingSoon;