import { Card, Center, Stack, Avatar, Text, Divider, Button, Transition } from "@mantine/core";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const user = useSelector((state) => state.user);

  const getUserId = () => {
    let id = localStorage.getItem("userId");
    if (!id) {
      id = Array.from({ length: 24 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join("");
      localStorage.setItem("userId", id);
    }
    return id;
  };

  const getCreatedAt = () => {
    let date = localStorage.getItem("createdAt");
    if (!date) {
      date = new Date().toLocaleString();
      localStorage.setItem("createdAt", date);
    }
    return date;
  };

  const userId = getUserId();
  const createdAt = getCreatedAt();

  const fallbackUser = {
    name: "P V Sarath Bhushan",
    email: "2210080030@klh.edu.in",
    avatar: "https://i.pravatar.cc/300?img=12",
    userId: userId,
    createdAt: createdAt,
  };

  const profile = user?.name
    ? {
        ...user,
        userId: userId,
        createdAt: createdAt,
        avatar: user.avatar || "https://i.pravatar.cc/300?img=65",
      }
    : fallbackUser;

  const [avatarUrl, setAvatarUrl] = useState(profile.avatar);
  const [mounted, setMounted] = useState(false);

  // Trigger animation when component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
    }
  };

  return (
    <Center style={{ minHeight: "100vh", backgroundColor: "#f9f9f9" }}>
      <Transition mounted={mounted} transition="scale" duration={600} timingFunction="ease">
        {(styles) => (
          <Card style={styles} shadow="sm" padding="xl" radius="md" withBorder sx={{ width: 350 }}>
            <Stack align="center" spacing="md">
              <Avatar
                src={avatarUrl}
                alt={profile.name}
                size={150}
                radius={75}
                style={{ border: "3px solid #7950f2" }}
              />
              <Button component="label" variant="outline" color="grape" radius="md">
                Choose Profile Picture
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
              <Text size="xl" weight={700} align="center">
                {profile.name}
              </Text>
              <Divider my="sm" />
              <Stack spacing="xs" align="center">
                <Text size="sm" color="dimmed">
                  {profile.email}
                </Text>
                <Text size="sm">
                  <strong>User ID:</strong> {profile.userId}
                </Text>
                <Text size="sm">
                  <strong>Account Created:</strong> {profile.createdAt}
                </Text>
              </Stack>
            </Stack>
          </Card>
        )}
      </Transition>
    </Center>
  );
}
