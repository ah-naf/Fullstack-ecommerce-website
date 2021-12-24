import React from "react";
import { Collapse, Text, Avatar } from "@nextui-org/react";
import { Star } from "react-iconly";
import "./Review.css";

export default function Review({ data }) {
  return (
    <Collapse.Group style={{ display: "block" }}>
      <Collapse
        style={{ display: "block" }}
        title={
          <Text h6 size={15}>
            {data.first_name + ' ' + data.last_name}
            <span style={{ position: "relative", top: "-2px" }}>
              {[1, 2, 3, 4, 5].map((item, index) => {
                if(item > data.rating) return null
                return (
                  <Star
                    set="bold"
                    primaryColor="blueviolet"
                    style={{ width: "15px" }}
                    key={index}
                  />
                );
              })}
            </span>
          </Text>
        }
        subtitle={
          <Text h4 size={15}>
            {data.title}
          </Text>
        }
        contentLeft={
          <Avatar
            size="medium"
            src={data.avatar}
            color="secondary"
            bordered
            squared
          />
        }
      >
        <Text size={14}>{data.review_desc}</Text>
      </Collapse>
    </Collapse.Group>
  );
}
