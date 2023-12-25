import {
  AST_NODE_TYPES,
  ESLintUtils,
  TSESTree,
} from "@typescript-eslint/utils";
import { getFilename } from "@typescript-eslint/utils/eslint-utils";

export const name = "max-warn-level-rules";

const createRule = ESLintUtils.RuleCreator(
  (name: string) => "eslint-plugin-config-itself/" + name,
);

type Options = [{ max: number }];

function countWarnInRules(rules: TSESTree.ObjectLiteralElement | undefined) {
  if (
    rules &&
    rules.type === AST_NODE_TYPES.Property &&
    rules.value.type === AST_NODE_TYPES.ObjectExpression
  ) {
    const warnRulesCount = rules.value.properties.filter((property) => {
      if (
        property.type === AST_NODE_TYPES.Property &&
        property.value.type === AST_NODE_TYPES.Literal &&
        property.value.value === "warn"
      ) {
        return true;
      }
      if (
        property.type === AST_NODE_TYPES.Property &&
        property.value.type === AST_NODE_TYPES.ArrayExpression &&
        property.value.elements[0]?.type === AST_NODE_TYPES.Literal &&
        property.value.elements[0]?.value === "warn"
      ) {
        return true;
      }

      return false;
    }).length;

    return warnRulesCount;
  }

  return 0;
}

export const rule = createRule<Options, "maxWarnLevelRules">({
  name,
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforce a maximum number of warn level rules in .eslintrc.js",
    },
    messages: {
      maxWarnLevelRules:
        "Too many warn level rules ({{total}}). Max is {{max}}.",
    },
    schema: [
      {
        type: "object",
        properties: {
          max: {
            type: "integer",
            minimum: 0,
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{ max: 0 }],
  create(context, [{ max }]) {
    const currentFileName = getFilename(context);
    if (
      ![".eslintrc.js", ".eslintrc.cjs"].find((filename) =>
        currentFileName.includes(filename),
      )
    ) {
      return {};
    }

    let total = 0;

    return {
      ObjectExpression(node) {
        const properties = node.properties;
        const rules = properties.find((property) => {
          return (
            (property.type === AST_NODE_TYPES.Property &&
              property.key.type === AST_NODE_TYPES.Literal &&
              property.key.value === "rules") ||
            (property.type === AST_NODE_TYPES.Property &&
              property.key.type === AST_NODE_TYPES.Identifier &&
              property.key.name === "rules")
          );
        });
        total += countWarnInRules(rules);
      },

      "Program:exit"(node) {
        if (total > max) {
          context.report({
            node,
            messageId: "maxWarnLevelRules",
            data: {
              total,
              max,
            },
          });
        }
      },
    };
  },
});
