import { useCallback, useMemo, useState } from 'react';
import { getAttributeValue } from '../lib';
import useLocale from '../composition/useLocale';
import config from '../sunrise.config';

function VariantSelector({ allVariants, sku }) {
  const { locale } = useLocale();
  const tmpAttributes = useMemo(
    () =>
      allVariants
        .map(({ attributesRaw, sku: s }) =>
          attributesRaw.map(({ name, value }) => {
            return {
              label: name, //@todo: how to translate name??
              value: getAttributeValue(value, locale),
              sku: s,
              score: s === sku ? 1 : 0,
            };
          })
        )
        .flat()
        .filter(({ label }) =>
          config.variantSelector.includes(label)
        ),
    [allVariants, locale, sku]
  );
  const [validKeys, variants] = useMemo(() => {
    const variants = tmpAttributes.reduce(
      (acc, { label, value }) =>
        acc.set(
          label,
          (acc.get(label) || []).concat(value)
        ),
      new Map()
    );
    variants.forEach((value, key) => {
      if (new Set(value).size <= 1) {
        variants.delete(key);
      } else {
        variants.set(key, [...new Set(value)]);
      }
    });
    return [[...variants.keys()], variants];
  }, [tmpAttributes]);
  const [score, setScore] = useState(() =>
    tmpAttributes
      .filter(({ label }) => validKeys.includes(label))
      .reduce(
        (acc, { label, value, score, sku }) =>
          acc.set(sku, {
            ...acc.get(sku),
            score: (acc.get(sku)?.score || 0) + score,
            [label]: value,
          }),
        new Map()
      )
  );
  const [userSet, setUserSet] = useState({});
  const updateScore = useCallback(
    (label, value) => {
      const previousScore = (v) => {
        const pref = score.get(sku);
        return Object.keys(pref)
          .filter((key) => key !== 'score')
          .reduce(
            (acc, item) =>
              v[item] === pref[item] ? acc + 1 : acc,
            0
          );
      };
      const { [label]: _, ...rest } = userSet;
      setUserSet({ ...rest, [label]: value });
      const newScore = new Map(score);
      newScore.forEach((v, sku) => {
        const newV = { ...v };
        newV.score =
          v[label] === value
            ? 100
            : v[label] === userSet[label]
            ? 20
            : 0;
        newV.score = newV.score + previousScore(v);
        newScore.set(sku, newV);
      });
      setScore(newScore);
    },
    [score, sku, userSet]
  );
  const setVariant = useCallback(() => {
    let high = 0;
    let s;
    score.forEach(({ score }, key) => {
      if (score >= high) {
        high = score;
        s = key;
      }
    });
    //@todo: move to new sku
    console.log('move to:', s);
  }, [score]);
  const variantChange = useCallback(
    (label, e) => {
      updateScore(label, e.target.value);
    },
    [updateScore]
  );
  const changeAndSet = useCallback(
    (label, e) => {
      variantChange(label, e);
      setVariant();
    },
    [setVariant, variantChange]
  );
  const isSelected = useCallback(
    (label, value) => score.get(sku)[label] === value,
    [score, sku]
  );
  return (
    <div>
      {[...variants.entries()].map(([label, variants]) => (
        <select
          onChange={(e) => changeAndSet(label, e)}
          key={label}
        >
          {variants.map((variant) => (
            <option key={variant} value={variant}>
              {variant}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
}
export default VariantSelector;
