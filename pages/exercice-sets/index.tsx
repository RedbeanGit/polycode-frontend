import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Card from '../../components/card';
import { NavLocation } from '../../components/navbar';
import { NotificationType, useNotification } from '../../components/notification';
import Footer from '../../layouts/footer';
import Header from '../../layouts/header';
import NotificationDrawer from '../../layouts/notification-drawer';
import PreviewGrid from '../../layouts/preview-grid';
import { ExerciceSet, ExerciceSetType } from '../../models/exerciceSet';
import { getExerciceSets } from '../../services/api/exercice-set';
import { PaginatedRequest } from '../../services/pagination';

interface PageVariation {
  navLocation: NavLocation;
  exerciceSetType: string;
}

export default function ExerciceSetList() {
  const [exerciceSets, setExerciceSets] = useState<ExerciceSet[]>(Array<ExerciceSet>(100).fill(undefined));
  const [pageVariation, setPageVariation] = useState<PageVariation>({
    navLocation: NavLocation.Home,
    exerciceSetType: 'Exercice sets',
  });
  const [notificationsProps, sendNotification, handleNotificationClose] = useNotification();
  const router = useRouter();
  const { type } = router.query;

  useEffect(() => {
    const fetchExerciceSets = async (type?: ExerciceSetType) => {
      const { data, status, error } = await getExerciceSets({} as PaginatedRequest, type);
      
      if (error) {
        sendNotification({
          type: NotificationType.Error,
          title: 'Failed to fetch exercice sets',
          message: error.message,
        });

        if (status === 401) {
          router.push('/login');
        }
      } else {
        if (data) {
          setExerciceSets(data.data);
        } else {
          sendNotification({
            type: NotificationType.Error,
            title: 'Failed to fetch exercice sets',
            message: 'No data returned',
          });
        }
      }
    }

    switch (type) {
      case 'challenge':
        setPageVariation({
          navLocation: NavLocation.Challenge,
          exerciceSetType: 'Challenges',
        });
        fetchExerciceSets(ExerciceSetType.CHALLENGE);
        break;
      case 'practice':
        setPageVariation({
          navLocation: NavLocation.Practice,
          exerciceSetType: 'Practices',
        });
        fetchExerciceSets(ExerciceSetType.PRACTICE);
        break;
      default:
        setPageVariation({
          navLocation: NavLocation.Home,
          exerciceSetType: 'Exercice sets',
        });
        fetchExerciceSets();
        break;
    }
  }, [type]);

  useEffect(() => {
    if (exerciceSets.length === 0) {
      sendNotification({
        type: NotificationType.Warning,
        title: 'No exercice sets found',
        message: 'Unable to find exercice sets',
      });
    }
  }, [exerciceSets]);

  return (
    <div>
      <Header location={pageVariation.navLocation} />
      <section>
        <PreviewGrid title={pageVariation.exerciceSetType}>
          {exerciceSets.map(exerciceSet => (
            <Card
              key={exerciceSet?.id}
              title={exerciceSet ? exerciceSet.name : 'Loading...'}
              description={exerciceSet ? exerciceSet.description : 'Loading...'}
              image={exerciceSet?.image}
              onClick={exerciceSet
                ? () => router.push(`/exercice-sets/${exerciceSet.id}`)
                : undefined}
              isFake={!exerciceSet}
            />
          ))}
        </PreviewGrid>
      </section>
      <Footer />
      <NotificationDrawer
        notificationsProps={notificationsProps}
        onNotificationClose={handleNotificationClose}
      />
    </div>
  );
}