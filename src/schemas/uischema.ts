const uischema = {
    type: "Group",
    elements: [
      {
        type: "Group",
        label: "My User",
        elements: [
          {
            type: "Control",
            scope: "#/properties/user/properties/a08"
          },
          {
            type: "Control",
            scope: "#/properties/user/properties/a09",
            options: {
              multi: true
            }
          }
        ]
      },
      {
        type: "Group",
        label: "Profile",
        elements: [
          {
            type: "Control",
            scope: "#/properties/item/properties/s01"
          },
          {
            type: "Control",
            scope: "#/properties/item/properties/p02"
          },
          {
            type: "Control",
            scope: "#/properties/item/properties/i01"
          }
        ]
      }
    ]
  };
  
  export default uischema;
  