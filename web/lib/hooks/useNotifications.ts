"use client";

import {

  useEffect,

  useState

} from "react";

import {

  notificationService

} from "@/lib/services/notificationService";

import type {

  Notification

} from "@/types/notification";


export function useNotifications() {

  const [

    notifications,

    setNotifications

  ] = useState<Notification[]>([]);


  const [

    loading,

    setLoading

  ] = useState(true);


  const fetchNotifications =
    async () => {

      try {

        const data =
          await notificationService
            .getNotifications();

        setNotifications(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    };


  const markAllRead =
    async () => {

      try {

        await notificationService
          .markRead();


        setNotifications(prev =>

          prev.map(notification => ({

            ...notification,

            read: true
          }))
        );

      } catch (error) {

        console.error(error);
      }
    };


  useEffect(() => {

    fetchNotifications();


    const interval =
      setInterval(() => {

        fetchNotifications();

      }, 60000);


    return () =>
      clearInterval(interval);

  }, []);


  const unreadCount =

    notifications.filter(
      notification => !notification.read
    ).length;


  return {

    notifications,

    unreadCount,

    loading,

    refresh: fetchNotifications,

    markAllRead
  };
}