import { useCallback, FormEvent } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from '../../hooks/useForm';
import { validateEmail } from '../../utils/validation';
import ExplosionEffect from './ExplosionEffect';

interface FrequencyModalProps {
    open: boolean;
    onClose: () => void;
}

export default function FrequencyModal({
    open,
    onClose,
}: FrequencyModalProps) {
    const { formState, handleChange, validateForm } = useForm(
        ['name', 'email'],
        {
            email: validateEmail,
        }
    );

    const handleSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>): Promise<void> => {
            event.preventDefault();
            if (!validateForm()) {
                return;
            }
        },
        [validateForm]
    );

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
                '& .MuiDialog-paper': {
                    maxWidth: 420,
                    width: '100%',
                },
            }}
        >
            <DialogTitle
                id="alert-dialog-title"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                Join the Frequency List
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    edge="end"
                    sx={{
                        position: 'absolute',
                        right: 20,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <form
                    className="flex flex-col gap-4 py-2"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <label htmlFor="name" className="sr-only">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            autoComplete="firstName"
                            placeholder="First Name"
                            value={formState.name as string}
                            onChange={handleChange('name')}
                            required
                            className="w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="sr-only">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            autoComplete="email"
                            value={formState.email as string}
                            onChange={handleChange('email')}
                            required
                            className="w-full bg-white px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mt-4">
                        <ExplosionEffect className="w-full">
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 rounded-lg border border-b-4 border-[#6b3200] text-base font-medium text-white bg-gradient-to-b from-[#a05a08] to-[#904805] shadow-lg hover:shadow-xl hover:translate-y-0.5 active:translate-y-1 transition duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                Join the Frequency List
                            </button>
                        </ExplosionEffect>
                        <div className='text-center text-sm mt-2'>
                            <span className='text-base text-[#696969] font-segoe'>Already have an account?</span>{' '}
                            <a href='/sign-in' className='text-base font-medium text-[#623408] hover:text-orange-900 font-segoe'>
                                Log in
                            </a>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}