import styles from "./index.module.scss";
import React, { useState } from "react";
import { Card, Grid, Text, Chat } from "react-ck";
import { DefaultLayout } from "../../components/DefaultLayout";

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
        <div className={styles.job_menu}>
          <Text variation="small" skin="highlight-primary">
            Jobs Suggestions
          </Text>

          <Grid>
            <Grid.Column size={4}>
              <Card interaction="click">
                <Text margin="bottom" skin="highlight-primary" variation="extra-small">
                  Synthex AI
                </Text>
                <Text margin="none">Migrate client data</Text>
              </Card>
            </Grid.Column>
            <Grid.Column size={4}>
              <Card interaction="click">
                <Text margin="bottom" skin="highlight-primary" variation="extra-small">
                  Bank X
                </Text>
                <Text margin="none">Migrate client data</Text>
              </Card>
            </Grid.Column>
            <Grid.Column size={4}>
              <Card interaction="click">
                <Text margin="bottom" skin="highlight-primary" variation="extra-small">
                  Fairstone
                </Text>
                <Text margin="none">Compare multiple spreadsheets</Text>
              </Card>
            </Grid.Column>
          </Grid>

          <Text variation="small" skin="highlight-primary">
            Saved Jobs
          </Text>

          <Grid>
            <Grid.Column size={4}>
              <Card interaction="click">
                <Text margin="bottom" skin="highlight-primary" variation="extra-small">
                  Synthex AI
                </Text>
                <Text margin="none">Migrate client data</Text>
              </Card>
            </Grid.Column>
            <Grid.Column size={4}>
              <Card interaction="click">
                <Text margin="bottom" skin="highlight-primary" variation="extra-small">
                  Bank X
                </Text>
                <Text margin="none">Migrate client data</Text>
              </Card>
            </Grid.Column>
            <Grid.Column size={4}>
              <Card interaction="click">
                <Text margin="bottom" skin="highlight-primary" variation="extra-small">
                  Fairstone
                </Text>
                <Text margin="none">Compare multiple spreadsheets</Text>
              </Card>
            </Grid.Column>
          </Grid>
        </div>

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
