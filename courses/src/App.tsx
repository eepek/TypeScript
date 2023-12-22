const App = () => {
  //9.14
  interface CourseNameProps {
    courseName: string;
  }

  // interface CoursePartsProps {
  //   name: string;
  //   exerciseCount: number;
  // }

  // interface ContentProps {
  //   courseParts: CoursePartsProps[];
  // }

  interface TotalProps {
    totalExercises: number;
  }

  const courseName = "Half Stack application development";
  // const courseParts = [
  //   {
  //     name: "Fundamentals",
  //     exerciseCount: 10
  //   },
  //   {
  //     name: "Using props to pass data",
  //     exerciseCount: 7
  //   },
  //   {
  //     name: "Deeper type usage",
  //     exerciseCount: 14
  //   }
  // ];

  const Header = (props: CourseNameProps) => {
    return <h1>{props.courseName}</h1>;
  };

  // const CoursePart = (props: CoursePartsProps) => {
  //   return (
  //     <p>
  //       {props.name} {props.exerciseCount}
  //     </p>
  //   );
  // };

  // const Content = (props: ContentProps) => {
  //   const courseParts = props.courseParts;
  //   return courseParts.map((course) => {
  //     return (
  //       <CoursePart name={course.name} exerciseCount={course.exerciseCount} />
  //     );
  //   });
  // };

  const Total = (props: TotalProps) => {
    return <p>Number of exercises {props.totalExercises}</p>;
  };

  //9.15
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartWithDescription extends CoursePartBase {
    description: string;
  }

  interface CoursePartBasic extends CoursePartWithDescription {
    kind: "basic";
  }

  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group";
  }

  interface CoursePartBackground extends CoursePartWithDescription {
    backgroundMaterial: string;
    kind: "background";
  }

  interface CoursePartSpecial extends CoursePartWithDescription {
    requirements: string[];
    kind: "special";
  }

  type CoursePart =
    | CoursePartBasic
    | CoursePartGroup
    | CoursePartBackground
    | CoursePartSpecial;

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    },
  ];

  const assertNever = (part: never): never => {
    throw new Error(
      `Unhandlhed discrimination union member: ${JSON.stringify(part)}`
    );
  };

  const Part = (props: CoursePart) => {
    let optionalParts;
    switch (props.kind) {
      case "basic":
        optionalParts = <i>{props.description}</i>;
        break;
      case "background":
        optionalParts = (
          <>
            <i>{props.description}</i>
            <br />
            <>submit to {props.backgroundMaterial}</>
          </>
        );
        break;
      case "group":
        optionalParts = <>group exercises {props.groupProjectCount}</>;
        break;
      case "special":
        optionalParts = (
          <>
            <>
              Requirements:{" "}
              <ul>
                {props.requirements.map((req) => (
                  <li key={req}>{req}</li>
                ))}
              </ul>
            </>
          </>
        );
        break;
      default:
        return assertNever(props);
    }

    return (
      <div>
        <div>
          <b>
            {props.name} {props.exerciseCount}
          </b>
        </div>
        <div>{optionalParts}</div>
        <br />
      </div>
    );
  };

  const Content = () => {
    return courseParts.map((part: CoursePart) => {
      return <Part key={part.name} {...part} />;
    });
  };

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header courseName={courseName} />
      <Content />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
