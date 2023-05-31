import React from 'react'
import AudioPlayer from './AudioPlayer'

const MailDetails = ({emails,currentEmailId}) => {

    const email = emails.find((x) => x.mail_id === currentEmailId)

    if (!email) {
        return (
            <div className="email-details__wrapper col-md-8">
            <div className="empty-container">
                <div className="empty-container__content"></div>
            </div>
            </div>
        );
    }

    
    return (
        <div className="email-details__wrapper col-md-8">
            <div className="email-details__container">
            <div className="email-details__header">
                <div className="email-details__info">
                <strong>{"<"}{email.sender_mail}{">"}</strong>
                <span className="pull-right">{email.date_time}</span>
                </div>
                <div>{email.subject}</div>
            </div>
            <div className="email-details__message">
                <AudioPlayer arrayBuffer = {email.audio_data} />
            </div>
            </div>
        </div>
    );
};

export default MailDetails