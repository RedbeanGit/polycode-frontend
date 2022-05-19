import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Card from '../../components/card';
import { NavLocation } from '../../components/navbar';
import { NotificationType, useNotification } from '../../components/notification';
import Footer from '../../layouts/footer';
import Header from '../../layouts/header';
import NotificationDrawer from '../../layouts/notification-drawer';
import PreviewGrid from '../../layouts/preview-grid';
import { ExerciceSet } from '../../models/exerciceSet';
import { getExerciceSet, getExerciceSetProgress } from '../../services/api/exercice-set';

export default function ExerciceSetDetail() {
  const [exerciceSet, setExerciceSet] = useState<ExerciceSet>(null);
  const [navLocation, setNavLocation] = useState<NavLocation>(NavLocation.Home);
  const [notificationsProps, sendNotification, onNotificationClose] = useNotification();
  const [exerciceSetProgress, setExerciceSetProgress] = useState<number>(0);
  const router = useRouter();
  const { exerciceSetId, type } = router.query;

  useEffect(() => {
    const fetchExerciceSet = async (id: number) => {
      const { data, status, error } = await getExerciceSet(id);

      if (error) {
        sendNotification({
          type: NotificationType.Error,
          title: 'Unable to fetch exercice set',
          message: error.message,
        });

        if (status === 401) {
          router.push('/login');
        }
      } else {
        setExerciceSet(data);
      }
    }

    const fetchProgress = async (id: number) => {
      const { data, status, error } = await getExerciceSetProgress(id);

      if (error) {
        sendNotification({
          type: NotificationType.Error,
          title: 'Unable to fetch progress',
          message: error.message,
        });

        if (status === 401) {
          router.push('/login');
        }
      } else {
        setExerciceSetProgress(data);
      }
    }

    const exerciceSetIdNumber = Number(exerciceSetId);

    if (!isNaN(exerciceSetIdNumber)) {
      fetchExerciceSet(exerciceSetIdNumber);
      fetchProgress(exerciceSetIdNumber);
    } else {
      sendNotification({
        type: NotificationType.Error,
        title: 'Unable to fetch exercice set',
        message: 'Invalid exercice set id',
      });
    }
  }, []);

  useEffect(() => {
    switch (type) {
      case 'challenge':
        setNavLocation(NavLocation.Challenge);
        break;
      case 'practice':
        setNavLocation(NavLocation.Practice);
        break;
      default:
        setNavLocation(NavLocation.Home);
        break;
    }
  }, [type]);

  return (
    <div>
      <Header location={navLocation} />
      <section>
        <PreviewGrid title={exerciceSet
            ? `${exerciceSet.name} (${exerciceSetProgress ? `${exerciceSetProgress} exercise(s) completed` : 'Not started yet'})`
            : 'Loading exercices'}>
          {exerciceSet
            ? exerciceSet.exercices.map((exercice, index) => (
                <Card
                  key={exercice.id}
                  title={exercice.name}
                  description={`Exercice #${index + 1}`}
                  image={exerciceSet.image}
                  onClick={() => router.push(`/editor/${exercice.id}`)}
                />
              ))
            : <div className='skeleton'>No exercice for the moment</div>}
        </PreviewGrid>
      </section>
      <Footer />
      <NotificationDrawer
        notificationsProps={notificationsProps}
        onNotificationClose={onNotificationClose}
      />
    </div>
  );
}