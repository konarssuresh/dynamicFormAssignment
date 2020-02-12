export const formsMetaData=[
    {
    stepName: "Step 1",
    Controls: [
        {
        Field: "First Name",
        Type: "text" ,
        Required: true,
        Length: 30
        },
        {
        Field: "Last Name",
        Type: "text",
        Required: true,
        Length: 30
        },
        {
        Field: 'Address',
        Type: 'textarea',
        Required: true,
        Length: 300
        },
    ]
    },
    {
    stepName: 'Step 2',
    Controls: [
        {
            Field: 'Interested In?',
            Type: 'checkbox',
            Required: true,
            Options: ["Books", "TV", "Video games"]
        }
    ]
    }
    ]