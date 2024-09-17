import React from "react";
import { Text } from "@react-ck/text";
import { Table } from "@react-ck/table";
import { faker } from "@faker-js/faker";
import { Manager } from "@react-ck/manager";
import { ShadowDom } from "./ShadowDom";
import { skins, variations } from "./Text";

const filteredVariations = variations.filter((i) => i !== "banner");
const folteredSkins = skins.filter((i) => i !== "inverted");

export const TextTable = (): React.ReactNode => (
  <ShadowDom cssQuerySelector='[data-module="storybook-styles"]'>
    <Manager>
      <Table skin="bordered">
        <Table.Thead>
          <Table.Tr>
            <Table.Th />
            {folteredSkins.map((s) => (
              <Table.Th key={s}>{s}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.TBody>
          {filteredVariations.map((v) => (
            <Table.Tr key={v}>
              <Table.Th>
                <Text variation={v}>{v}</Text>
              </Table.Th>
              {folteredSkins.map((s) => (
                <Table.Td key={s}>
                  <Text variation={v} skin={s}>
                    {faker.lorem.word()}
                  </Text>
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.TBody>
      </Table>
    </Manager>
  </ShadowDom>
);
