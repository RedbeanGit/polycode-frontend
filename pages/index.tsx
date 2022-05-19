import { useState, useEffect, createContext } from 'react';
import Header from '../layouts/header';
import Hero from '../layouts/hero';
import PreviewSet from '../layouts/preview-set';
import { ExerciceSet } from '../models/exerciceSet';
import { User } from '../models/user';
import { me } from '../services/api/auth';
import Footer from '../layouts/footer';
import { NavLocation } from '../components/navbar';
import { getExerciceSets, getSpotlightExerciceSet } from '../services/api/exercice-set';
import Card from '../components/card';
import { useRouter } from 'next/router';
import { NotificationType, useNotification } from '../components/notification';
import NotificationDrawer from '../layouts/notification-drawer';

const LoggedUserContext = createContext<User>(null);

export default function Home() {
  const [exerciceSets, setExerciceSets] = useState<ExerciceSet[]>([]);
  const [spotlightExerciceSet, setSpotlightExerciceSet] = useState<ExerciceSet>(null);
  const [user, setUser] = useState(null);
  const [notificationsProps, sendNotification, handleNotificationClose] = useNotification();
  const router = useRouter();

  const createExerciceSetCard = (exerciceSet?: ExerciceSet) => {
    return (
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
    );
  }

  const fakeCards = [];

  for (let i = 0; i < 30; i++) {
    fakeCards.push(createExerciceSetCard());
  }

  useEffect(() => {
    const fetchUser = async () => {
      setUser(await me());
    }

    const fetchExerciceSets = async (category?: string) => {
      const { data, status, error } = await getExerciceSets();

      if (error) {
        sendNotification({
          type: NotificationType.Error,
          title: 'Failed to fetch sets',
          message: error.message,
        });
        
        if (status === 401) {
          router.push('/login');
        }
      } else if (data) {
        setExerciceSets(data.data);
      } else {
        sendNotification({
          type: NotificationType.Error,
          title: 'Failed to fetch exercice sets',
          message: 'No data received from the server',
        });
      }
    }

    const fetchSpotlightExerciceSet = async () => {
      const { data, status, error } = await getSpotlightExerciceSet();

      if (error) {
        sendNotification({
          type: NotificationType.Error,
          title: 'Failed to fetch spotlight set',
          message: error.message,
        });
      
        if (status === 401) {
          router.push('/login');
        }
      } else {
        setSpotlightExerciceSet(data);
      }
    }

    fetchUser();
    fetchExerciceSets();
    fetchSpotlightExerciceSet();
  }, [router]);

  return (
    <LoggedUserContext.Provider value={user}>
      <Header location={NavLocation.Home} />
      <Hero exerciceSet={spotlightExerciceSet} />
      <div>
        <section>
          <PreviewSet title='Challenges' showAction='/exercice-sets?type=challenge'>
            {!exerciceSets || exerciceSets.length <= 0
              ? fakeCards
              : exerciceSets.map((exerciceSet) => (
                createExerciceSetCard(exerciceSet)
              ))}
          </PreviewSet>
        </section>
        <section>
          <PreviewSet title='Popular' showAction='/exercice-sets?category=popular'>
            {!exerciceSets || exerciceSets.length <= 0
              ? fakeCards
              : exerciceSets.map((exerciceSet, index) => (
                createExerciceSetCard(exerciceSet)
              ))}
          </PreviewSet>
        </section>
        <section>
          <PreviewSet title='Practice' showAction='/exercice-sets?type=practice'>
            {!exerciceSets || exerciceSets.length <= 0
              ? fakeCards
              : exerciceSets.map((exerciceSet, index) => (
                createExerciceSetCard(exerciceSet)
              ))}
          </PreviewSet>
        </section>
        <section>
          <PreviewSet title='Continue' showAction='/exercice-sets?category=continue'>
            {!exerciceSets || exerciceSets.length <= 0
              ? fakeCards
              : exerciceSets.map((exerciceSet, index) => (
                createExerciceSetCard(exerciceSet)
              ))}
          </PreviewSet>
        </section>
      </div>
      <Footer />
      <NotificationDrawer
        notificationsProps={notificationsProps}
        onNotificationClose={handleNotificationClose}
      />
    </LoggedUserContext.Provider>
  )
}