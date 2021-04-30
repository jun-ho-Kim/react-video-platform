import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Subscriber({userTo, userFrom}) {
    const [subscribeCount, setSubscribeCount] = useState(0);
    const [subscribed, setSubscribed] = useState(false);
    const onSubscribe = () => {
        if(subscribed) {
            axios.post('/api/subscribe//unSubscribe', {userTo, userFrom})
                .then(response => {
                    if(response.data.success) {
                        setSubscribeCount(subscribeCount -1);
                    } else {
                        alert('Failed to unsubscribe')
                    }
                });
            setSubscribed(false);
        } else {
            axios.post('/api/subscribe/subscribe', {userTo, userFrom})
                .then(response => {
                    if(response.data.success) {
                        setSubscribeCount(subscribeCount + 1)
                    }
                });
            setSubscribed(true);
        }

    }

    useEffect(() => {
        axios.post('/api/subscribe/subscribeCount', {userTo, userFrom})
            .then(response => {
                if(response.data.success) {
                    setSubscribeCount(response.data.subscribeCount)
                } else {
                    alert('Failed to get Subscribed Information')
                }
            });

        axios.post('/api/subscribe/subscribed', {userTo, userFrom})
            .then(response => {
                if(response.data.success) {
                    setSubscribed(response.data.subscribed);
                }
            });
    }, []);
    return (
        <button
            onClick={onSubscribe}
            style={{backgroundColor: `${subscribed ? 'red' : 'gray'}`,
            borderRadius: '4px', color: 'white', padding: '8px 22px',
            fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'}}
        >
            {subscribeCount} 구독
        </button>
    )
}

export default Subscriber
