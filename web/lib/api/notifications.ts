import { http }
from "@/lib/http"


export const notificationsApi = {

  getNotifications: () =>

    http.get("/notifications"),


  markRead: () =>

    http.patch(
      "/notifications/read",
      {}
    ),
}