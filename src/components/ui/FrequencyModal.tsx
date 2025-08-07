import { useCallback, FormEvent } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from '../../hooks/useForm';
import { validateEmail } from '../../utils/validation';
import ExplosionEffect from './ExplosionEffect';
import ConvertKitForm from './ConvertKitForm';

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
                <ConvertKitForm formId="8250927" />
            </DialogContent>
        </Dialog>
    );
}