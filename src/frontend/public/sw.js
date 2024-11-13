self.addEventListener('push', event => {
    const data = event.data.json();

    const options = {
        body: data.body,
        icon: data.icon,
        badge: '/badge.png',
        requireInteraction: true,
        actions: [
            { action: 'explore', title: 'Ver mais', icon: '/checkmark.png' },
            { action: 'close', title: 'Fechar', icon: '/xmark.png' }
        ]
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});
