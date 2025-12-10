import { init } from "z3-solver";

/**
 * Using Z3 to solve a system of linear equations with non-negative integer constraints.
 * The goal is to minimize the sum of six variables (a0 to a5) under given constraints.
 * Equations:
 * 1. a4 + a5 = 3
 * 2. a1 + a5 = 5
 * 3. a2 + a3 + a4 = 4
 * 4. a0 + a1 + a3 = 7
 *
 * Constraints: a0, a1, a2, a3, a4, a5 >= 0
 * Objective: Minimize a0 + a1 + a2 + a3 + a4 + a5
 *
 */

async function main() {
  const { Context, em } = await init();

  // Destructure types and functions directly from the context instance for clarity
  const { Int, Optimize } = Context("main");

  // 1. FIX: Instantiate the Optimizer using the preferred factory function (Optimize()).
  const optimizer = new Optimize();

  // Declare integer variables
  const a0 = Int.const("a0");
  const a1 = Int.const("a1");
  const a2 = Int.const("a2");
  const a3 = Int.const("a3");
  const a4 = Int.const("a4");
  const a5 = Int.const("a5");

  // Add non-negative constraints (a_i >= 0)
  optimizer.add(a0.ge(0));
  optimizer.add(a1.ge(0));
  optimizer.add(a2.ge(0));
  optimizer.add(a3.ge(0));
  optimizer.add(a4.ge(0));
  optimizer.add(a5.ge(0));

  // Add constraints (your equations)
  optimizer.add(a4.add(a5).eq(3));
  optimizer.add(a1.add(a5).eq(5));
  optimizer.add(a2.add(a3).add(a4).eq(4));
  optimizer.add(a0.add(a1).add(a3).eq(7));

  // 2. Define the objective function to minimize.
  const objective = a0.add(a1).add(a2).add(a3).add(a4).add(a5);

  // Use the minimize method
  optimizer.minimize(objective);
  console.log("Objective: Minimizing a0 + a1 + a2 + a3 + a4 + a5");

  // Check satisfiability and find the optimal solution
  const result = await optimizer.check();
  console.log("Satisfiable:", result.toString());

  if (result.toString() === "sat") {
    const model = optimizer.model();

    // 1. FIX: Use .toString() and parseInt() instead of the non-existent .asInt()
    // We use optional chaining (?) and nullish coalescing (??) for safety.

    // Retrieve individual constant values first
    // model.get(aN) returns an Expr. We call .toString() on it to get the number string, then parseInt().
    const v0 = parseInt(model.get(a0).toString());
    const v1 = parseInt(model.get(a1).toString());
    const v2 = parseInt(model.get(a2).toString());
    const v3 = parseInt(model.get(a3).toString());
    const v4 = parseInt(model.get(a4).toString());
    const v5 = parseInt(model.get(a5).toString());

    const optimalSum = v0 + v1 + v2 + v3 + v4 + v5;

    console.log("--- Optimal Solution Found ---");
    console.log(`Optimal Sum: ${optimalSum}`);

    // Log individual variables
    console.log(`a0 = ${v0}`);
    console.log(`a1 = ${v1}`);
    console.log(`a2 = ${v2}`);
    console.log(`a3 = ${v3}`);
    console.log(`a4 = ${v4}`);
    console.log(`a5 = ${v5}`);
  } else {
    console.log("No feasible solution exists for these constraints.");
  }

  em.PThread.terminateAllThreads();
}

main();
