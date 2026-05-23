import {ContactForm} from './ContactForm';

const Contact = () => {

    const copyText = async () => {
        await navigator.clipboard.writeText('@NifaNifa');
        alert('Скопировано!');
    };

    return (
        <section className="section section--muted" id="contact" aria-labelledby="contact-title">
            <div className="container contact">
                <div>
                    <h2 className="section__title" id="contact-title">
                        Контакты
                    </h2>
                    <ul className="contact-links">
                        <li>
                            <span>Telegram</span>
                            <a href="#" onClick={copyText}>@NifaNifa</a>
                        </li>
                        <li>
                            <span>GitHub</span>
                            <a href="https://github.com/Nelli-meow">https://github.com/Nelli-meow</a>
                        </li>
                    </ul>
                </div>
                <ContactForm/>
            </div>
        </section>
    )
};

export default Contact;