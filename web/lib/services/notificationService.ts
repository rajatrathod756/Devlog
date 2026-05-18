import {
  notificationsApi
} from "@/lib/api/notifications"


export const notificationService = {

  getNotifications: async () => {

    return notificationsApi
      .getNotifications()
  },


  markRead: async () => {

    return notificationsApi
      .markRead()
  }
}