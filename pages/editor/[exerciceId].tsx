import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { NavLocation } from '../../components/navbar';
import { NotificationType, useNotification } from '../../components/notification';
import Header from '../../layouts/header';
import ReactMarkdown from 'react-markdown';
import { Exercice, Language } from '../../models/exercice';
import { getExercice, testExercice } from '../../services/api/exercice';
import NotificationDrawer from '../../layouts/notification-drawer';
import Editor from '@monaco-editor/react';
import Select from '../../components/select';
import Button from '../../components/button';
import Play from '../../shapes/play';
import Footer from '../../layouts/footer';

export default function PolycodeEditor() {
  const router = useRouter();
  const [notificationsProps, sendNotification, handleNotificationClose] = useNotification();
  const [exercice, setExercice] = useState<Exercice>(null);
  const [editorContent, setEditorContent] = useState<string>('');
  const [consoleContent, setConsoleContent] = useState<string>('');
  const [language, setLanguage] = useState<Language>(Language.Javascript);
  const { exerciceId } = router.query;

  const handleEditorChange = (newValue: string, e: any) => {
    setEditorContent(newValue);
  }

  const handleRun = async () => {
    const { data, status, error } = await testExercice(exercice.id, {
      language, editorContent
    });

    if (error) {
      sendNotification({
        type: NotificationType.Error,
        title: 'An error occured while testing your code',
        message: error.message
      });

      if (status === 401) {
        router.push('/login');
      }
    } else {
      setConsoleContent(data.stdout + data.stderr);
      
      if (data.success) {
        sendNotification({
          type: NotificationType.Success,
          title: 'Success',
          message: 'You passed the test'
        });
      } else {
        sendNotification({
          type: NotificationType.Error,
          title: 'Error',
          message: 'You failed the test'
        });
      }
    }
  };

  useEffect(() => {
    const fetchExercice = async (id: number) => {
      const { data, status, error } = await getExercice(id);

      if (error) {
        sendNotification({
          type: NotificationType.Error,
          title: 'Failed to fetch exercice',
          message: error.message,
        });

        if (status === 401) {
          router.push('/login');
        }
      } else {
        setExercice(data);
      }
    }
    const exerciceIdNumber = Number(exerciceId);

    if (!isNaN(exerciceIdNumber)) {
      fetchExercice(exerciceIdNumber);
    } else {
      sendNotification({
        type: NotificationType.Error,
        title: 'Failed to fetch exercice',
        message: 'Exercice id is not a number',
      })
    }
  }, []);

  useEffect(() => {
    if (exercice) {
      setEditorContent(exercice.baseEditorContent);
    }
  }, [exercice]);

  return (
    <div>
      <Header location={NavLocation.Home} />
      <section className='editor'>
        {exercice
          ? <>
              <ReactMarkdown className='editor__statement'>{exercice?.statement}</ReactMarkdown>
              <div className='editor__ide'>
                <div className='editor__actions'>
                  <Select
                    entries={[Language.Javascript, Language.Python, Language.Java, Language.Rust]}
                    onSelect={(langage: Language) => setLanguage(langage)}
                  />
                  <Button
                    onClick={handleRun}
                    icon={<Play className='button__icon' />}
                    little
                    borderless
                  >
                    Run
                  </Button>
                </div>
                <div className='editor__editor'>
                  <Editor
                    value={editorContent}
                    height='100%'
                    language={Language.Javascript}
                    onChange={handleEditorChange}
                  />
                </div>
                <div className='editor__console'>
                  <p className='editor__console-title'>Console</p>
                  <Editor
                    value={consoleContent}
                    height='100%'
                    onChange={(newValue: string) => {}}
                  />
                </div>
              </div>
            </>
          : <></>}
      </section>
      <Footer />
      <NotificationDrawer
        notificationsProps={notificationsProps}
        onNotificationClose={handleNotificationClose}
      />
    </div>
  );
}