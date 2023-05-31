import { useDisclosure } from '@mantine/hooks';
import { Modal, useMantineTheme } from '@mantine/core';
import SharePost from '../SharePost/SharePost'

function ShareModal({ modalOpened, setModalOpened }) {
    const [opened, { open, close }] = useDisclosure(false);
    const theme = useMantineTheme();

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                title="Authentication"
                overlayProps={{
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                    opacity: 0.55,
                    blur: 3,
                }}
                size='55%'

                opened={modalOpened}

                onClose={() => setModalOpened(false)}

            >
                <SharePost />
            </Modal>

        </>
    );
}
export default ShareModal