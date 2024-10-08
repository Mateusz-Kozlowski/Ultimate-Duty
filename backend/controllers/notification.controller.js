export const getUserNotifications = async (req, res) => {
    try {
        const notifications = await Notification
            .find(
                { recipient: req.user._id }
            )
            .sort(
                { createdAt: -1}
            )
            .populate( // Replace 'relatedUser' with full user details
                "relatedUser",
                "name username profilePicture"
            )
            .populate( // Replace 'relatedPost' with post details
                "relatedPost",
                "content image"
            );

        res.status(200).json(notifications);
    }
    catch (error) {
        console.error("Error in getUserNotifications controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const markNotificationAsRead = async (req, res) => {
    const notificationId = req.params.id;

    try {
        const notification = await Notification.findByIdAndUpdate(
            {_id: notification, recipient: req.user._id},
            {read: true},
            {new: true}            
        );

        res.json(notification);
    }
    catch (error) {
        console.error("Error in markNotificationAsRead controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteNotification = async (req, res) => {
    const notificationId = req.params.id;

    try {
        const notification = await Notification.findOneAndDelete(
            {_id: notification, recipient: req.user._id}
        );

        res.json({ message: "Notification deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}
