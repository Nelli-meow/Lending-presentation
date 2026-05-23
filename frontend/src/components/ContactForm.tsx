import {useState, type FormEvent, type ChangeEvent} from 'react';
import {sendContact} from '../api/contact';
import type {ContactPayload} from '../types/contact';
import {validateContact} from '../utils/validation';

type Field = keyof ContactPayload;
type StatusType = 'loading' | 'success' | 'error';

const emptyForm = (): ContactPayload => ({
    name: '',
    phone: '',
    email: '',
    comment: '',
});

export const ContactForm = () => {
    const [form, setForm] = useState<ContactPayload>(emptyForm);
    const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
    const [status, setStatus] = useState<{ type: StatusType; message: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange =
        (field: Field) =>
            (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setForm((prev) => ({...prev, [field]: e.target.value}));
                setErrors((prev) => {
                    const next = {...prev};
                    delete next[field];
                    return next;
                });
            };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setStatus(null);

        const clientErrors = validateContact(form);

        if (Object.keys(clientErrors).length > 0) {
            setErrors(clientErrors);
            setStatus({
                type: 'error',
                message: 'Проверьте поля формы.',
            });
            return;
        }

        setErrors({});
        setLoading(true);
        setStatus({
            type: 'loading',
            message: 'Отправка…',
        });

        try {
            const res = await sendContact(form);

            setForm(emptyForm());

            setStatus({
                type: 'success',
                message: res.message,
            });
        } catch (error) {

            const message =
                error instanceof Error ? error.message : 'Неизвестная ошибка.';

            setStatus({ type: 'error', message });
        } finally {
            setLoading(false);
        }
    };
    return (
        <form
            className={`form card${loading ? ' is-loading' : ''}`}
            onSubmit={handleSubmit}
            noValidate
        >
            <h3>Обратная связь</h3>

            {status && (
                <p className={`form__status form__status--${status.type}`} role="status" aria-live="polite">
                    {status.message}
                </p>
            )}

            <div className="form__field">
                <label htmlFor="name">
                    Имя <abbr title="обязательно">*</abbr>
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange('name')}
                    className={errors.name ? 'is-invalid' : ''}
                    required
                    minLength={2}
                    maxLength={100}
                />
                {errors.name && (
                    <span className="form__error" role="alert">
            {errors.name}
          </span>
                )}
            </div>

            <div className="form__field">
                <label htmlFor="phone">
                    Телефон <abbr title="обязательно">*</abbr>
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange('phone')}
                    className={errors.phone ? 'is-invalid' : ''}
                    inputMode="tel"
                    required
                />
                {errors.phone && (
                    <span className="form__error" role="alert">
            {errors.phone}
          </span>
                )}
            </div>

            <div className="form__field">
                <label htmlFor="email">
                    Email <abbr title="обязательно">*</abbr>
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange('email')}
                    className={errors.email ? 'is-invalid' : ''}
                    required
                />
                {errors.email && (
                    <span className="form__error" role="alert">
            {errors.email}
          </span>
                )}
            </div>

            <div className="form__field">
                <label htmlFor="comment">
                    Комментарий <abbr title="обязательно">*</abbr>
                </label>
                <textarea
                    id="comment"
                    name="comment"
                    value={form.comment}
                    onChange={handleChange('comment')}
                    className={errors.comment ? 'is-invalid' : ''}
                    required
                    minLength={10}
                    maxLength={2000}
                    rows={4}
                />
                {errors.comment && (
                    <span className="form__error" role="alert">
            {errors.comment}
          </span>
                )}
            </div>

            <button className="btn" type="submit" disabled={loading}>
                {!loading && <span className="btn__text">Отправить</span>}
                {loading && <span className="btn__loader" aria-hidden="true"/>}
            </button>
        </form>
    );
};
