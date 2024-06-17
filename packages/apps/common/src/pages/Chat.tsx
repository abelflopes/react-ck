import React, { useState } from "react";
import { Card, Grid, Text, Chat } from "react-ck";
import { DefaultLayout } from "../components/DefaultLayout";

export const ChatPage = (): React.ReactElement => {
  const [messages, setMessages] = useState<string[]>([]);

  return (
    <DefaultLayout>
      <Chat
        status={{
          type: "loading",
          description: "Status",
        }}
        placeholder="Ask me anything..."
        onSend={(message) => {
          console.log("send", message);
          setMessages((v) => [...v, message]);
        }}>
        <Text variation="h2">Jobs Suggestions</Text>

        <Grid>
          <Grid.Column size={4}>
            <Card>
              <Text margin="bottom">Synthex AI</Text>
              <Text margin="top">Migrate client data</Text>
            </Card>
          </Grid.Column>
          <Grid.Column size={4}>
            <Card>
              <Text margin="bottom">Bank X</Text>
              <Text margin="top">Migrate client data</Text>
            </Card>
          </Grid.Column>
          <Grid.Column size={4}>
            <Card>
              <Text margin="bottom">Fairstone</Text>
              <Text margin="top">Compare multiple spreadsheets</Text>
            </Card>
          </Grid.Column>
        </Grid>

        <Text variation="h2">Saved Jobs</Text>

        <Grid>
          <Grid.Column size={4}>
            <Card>
              <Text margin="bottom">Synthex AI</Text>
              <Text margin="top">Migrate client data</Text>
            </Card>
          </Grid.Column>
          <Grid.Column size={4}>
            <Card>
              <Text margin="bottom">Bank X</Text>
              <Text margin="top">Migrate client data</Text>
            </Card>
          </Grid.Column>
          <Grid.Column size={4}>
            <Card>
              <Text margin="bottom">Fairstone</Text>
              <Text margin="top">Compare multiple spreadsheets</Text>
            </Card>
          </Grid.Column>
        </Grid>

        <Chat.Message senderName="Abel" type="sent">
          Hello
        </Chat.Message>
        <Chat.Message senderName="Abel" type="sent">
          How are you?
        </Chat.Message>
        <Chat.Message senderName="Joana" type="received">
          Hello
        </Chat.Message>
        {messages.map((i, k) => (
          // eslint-disable-next-line react/no-array-index-key -- needed
          <Chat.Message key={`${i}${k}`} senderName="Abel" type="sent">
            {i}
          </Chat.Message>
        ))}
      </Chat>
    </DefaultLayout>
  );
};
