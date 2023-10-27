import { match } from "ts-pattern";

type Animal = "Cat" | "Dog" | "Penguin";

const say = (animal: Animal) => {
  return match(animal)
    .with("Cat", () => "Meow")
    .with("Dog", () => "Bow")
    // .exhaustive(); // 全てのパターンが網羅されているかチェックする
};

say("Cat"); // "Meow"
say("Penguin"); // Type Error: '"Penguin"' is not assignable to parameter of type 'Animal'.
