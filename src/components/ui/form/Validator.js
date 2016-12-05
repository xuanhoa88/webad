import Messager from './Messager';

export default class Validator {
    static _data = {};
    static _rules = [];
    static _failedRules = {};
    static _errors = null;
    static _customMessages = {};
    static _customNames = {};
    static _customValues = {};
    static _messager = {};

    constructor(data, rules, messages, names, values) {
        this._messager = Object.assign({}, Messager);
        this._data = data;
        this._rules = this.parseRules(rules);
        this.setCustomMessages(messages);
        this.setCustomNames(names);
        this.setCustomValues(values);
    }

    get dateRules() {
        return ['Before', 'After', 'DateBetween'];
    }

    get sizeRules() {
        return ['Size', 'Between', 'Min', 'Max'];
    }

    get numericRules() {
        return ['Numeric', 'Integer'];
    }

    get implicitRules() {
        return [
            'Required', 'Filled', 'RequiredWith', 'RequiredWithAll', 'RequiredWithout', 'RequiredWithoutAll',
            'RequiredIf', 'RequiredUnless', 'Accepted', 'Present',
        ];
    }

    get dependentRules() {
        return [
            'RequiredWith', 'RequiredWithAll', 'RequiredWithout', 'RequiredWithoutAll',
            'RequiredIf', 'RequiredUnless', 'Confirmed', 'Identical', 'Same', 'Different', 'Unique',
            'Before', 'After',
        ];
    }

    static make({data, rules, messages, names, values}) {
        return new Validator(data, rules, messages, names, values);
    }

    parseRules(rules) {
        rules = Object.assign({}, rules);
        let arr = [];
        for (let key in rules) {
            arr.push({
                name: key,
                rules: this.parseItemRules(rules[key]),
            });
        }

        return arr;
    }

    parseItemRules(rules) {
        let arr = [];
        rules.split('|').forEach((ruleAndArgs) => {
            if (ruleAndArgs.trim()) {
                let args = ruleAndArgs.split(':');
                arr.push({
                    name: this.titleCase(args[0], '_'),
                    params: args[1] ? args[1].split(',') : [],
                });
            }
        });

        return arr;
    }

    addValidate(name, fn) {
        this['validate' + this.titleCase(name, '_')] = fn;
    }

    addMessage(rule, message) {
        this._messager[rule] = message;
    }

    titleCase(str, delimiter) {
        delimiter = delimiter || ' ';
        return str.split(delimiter).map((item) => {
            return item[0].toUpperCase() + item.slice(1).toLowerCase();
        }).join('');
    }

    snakeCase(str, delimiter) {
        delimiter = delimiter || '_';
        return str.replace(/(.)(?=[A-Z])/ug, '$1'+delimiter).toLowerCase();
    }

    getValue(name) {
        if (typeof this._data[name] === 'undefined') {
            return '';
        }

        return this._data[name];
    }

    isEmptyObject(obj) {
        return Object.getOwnPropertyNames(obj).length === 0;
    }

    isImplicit(rule) {
        return this.implicitRules.indexOf(rule) > -1;
    }

    hasData(name) {
        return typeof(this._data[name]) !== 'undefined';
    }

    hasRule(name, rules) {
        return this.getRule(name, rules) !== null;
    }

    getRule(name, rulesToCheck) {
        let a = this._rules.filter((item) => {
            return item.name === name;
        });

        if (a.length === 0) {
            return null;
        }

        a = a[0];

        if (! Array.isArray(rulesToCheck)) {
            rulesToCheck = [rulesToCheck];
        }

        let b = a.rules.filter((rule) => {
            return rulesToCheck.indexOf(rule.name) >= 0;
        })

        return b.length === 0 ? null : [ b[0].name, b[0].params ];
    }

    requireParameterCount(count, params, rule) {
        if (params.length < count) {
            throw new Error('Validation rule ' + rule + ' requires at least ' + count + ' parameters');
        }
    }

    passes() {
        this._errors = {};
        this._failedRules = {};

        for (let field in this._rules) {
            let item = this._rules[field];
            if (this.hasError(item.name)) {
                break;
            }

            item.rules.forEach((rule) => {
                this.validate(item.name, rule);
            })
        };

        return this.isEmptyObject(this._errors);
    }

    fails() {
        return !this.passes();
    }

    valid() {
        if (this._errors === null) {
            this.passes();
        }

        let arr = [];
        for (let key in this._data) {
            if (! this.hasError(key)) {
                arr.push(key);
            }
        }

        return arr;
    }

    invalid() {
        if (this._errors === null) {
            this.passes();
        }

        let arr = [];
        for (let key in this._errors) {
            arr.push(key);
        }

        return arr;
    }

    getErrorMessage(name, rule) {
        let msg = this.getMessage(name, rule);
        return this.doReplacements(msg, name, rule);
    }

    getMessage(name, rule) {
        let key = this.snakeCase(rule.name);
        let msg = this._customMessages[name + '.' + key];

        if (typeof(msg) !== 'undefined') {
            return msg;
        }

        msg = this._messager[key];

        // message might has sub-rule
        if (typeof(msg) === 'object') {
            let type = this.getDataType(name);
            msg = this._messager[key][type];
        }

        return typeof(msg) === 'undefined' ? '' : msg;
    }

    getDataType(name) {
        if (this.hasRule(name, this.numericRules)) {
            return 'numeric';
        }

        if (this.hasRule(name, ['Array'])) {
            return 'array';
        }

        /* SKIP file type */
        return 'string';
    }

    doReplacements(msg, name, rule) {
        if (msg.trim() === '') {
            return '';
        }

        name = this.getDataName(name);
        msg = msg.replace(':ATTR', name.toUpperCase())
            .replace(':Attr', this.titleCase(name))
            .replace(':attr', name);

        // call replacer
        let replacer = this['replace' + rule.name];
        if (typeof replacer === 'function') {
            msg = replacer.apply(this, [msg, name, rule.name, rule.params]);
        }

        return msg;
    }

    validate(name, rule) {
        let value = this.getValue(name);
        let method = this['validate' + rule.name];

        if (typeof method !== 'function') {
            console.error('"' + rule.name + '" validation rule does not exist!');
        }

        // return method.apply(this, [name, value, rule.params])
        if (! method.apply(this, [name, value, rule.params])) {
            this.addFailure(name, rule);
        }
    }

    addFailure(name, rule) {
        this.addError(name, rule);

        if (typeof(this._failedRules[name]) === 'undefined') {
            this._failedRules[name] = {};
        }
        this._failedRules[name][rule.name] = rule.params;
    }

    addError(name, rule) {
        let msg = this.getMessage(name, rule);
        msg = this.doReplacements(msg, name, rule);

        if (! this.hasError(name)) {
            this._errors[name] = [];
        }

        this._errors[name].push(msg);
    }

    hasError(name = null) {
        if (name === null) {
            return !this.isEmptyObject(this._errors);
        }

        return this.getError(name) === null ? false : true;
    }

    getError(name) {
        return !(name in this._errors) ? null : this._errors[name];
    }

    get firstErrors() {
        let errors = {};
        for (let field in this._errors) {
            if (!this.hasError(field)) {
                break;
            }
            errors[field] = this.getError(field).shift();
        };

        return errors;
    }

    get errors() {
        return this._errors;
    }

    /** Validation Rules **/

    validateSometimes() {
        return true;
    }

    validateBail() {
        return true;
    }

    shouldStopValidating(name) {
        if (! this.hasRule(name, ['Bail'])) {
            return false;
        }

        return this.hasError(name);
    }

    validateRequired(name, value, params) {
        if (value === null) {
            return false;
        }

        if (typeof(value) === 'string' && value.trim() === '') {
            return false;
        }

        if (Array.isArray(value) && value.length < 1) {
            return false;
        }

        return true;
    }

    validatePresent(name, value, params) {
        return typeof(this._data[name]) !== 'undefined';
    }

    validateFilled(name, value) {
        if (this.hasData(name)) {
            return this.validateRequired(name, value);
        }

        return true;
    }

    anyFailingRequired(names) {
        let result = false;
        names.forEach((name) => {
            if (! this.validateRequired(name, this.getValue(name))) {
                result = true;
                return;
            }
        })

        return result;
    }

    allFailingRequired(names) {
        let result = true;
        names.forEach((name) => {
            if (this.validateRequired(name, this.getValue(name))) {
                result = false;
                return;
            }
        })

        return result;
    }

    validateRequiredWith(name, value, params) {
        if (! this.allFailingRequired(params)) {
            return this.validateRequired(name, value);
        }

        return true;
    }

    validateRequiredWithAll(name, value, params) {
        if (! this.anyFailingRequired(params)) {
            return this.validateRequired(name, value);
        }

        return true;
    }

    validateRequiredWithout(name, value, params) {
        if (this.anyFailingRequired(params)) {
            return this.validateRequired(name, value);
        }

        return true;
    }

    validateRequiredWithoutAll(name, value, params) {
        if (this.allFailingRequired(params)) {
            return this.validateRequired(name, value);
        }

        return true;
    }

    validateRequiredIf(name, value, params) {
        this.requireParameterCount(2, params, 'required_if');

        let data = this.getValue(params[0]);
        if (typeof(data) === 'boolean') {
            data = data.toString();
        }

        let values = params.slice(1);

        if (values.indexOf(data) >= 0) {
            return this.validateRequired(name, value);
        }

        return true;
    }

    validateRequiredUnless(name, value, params) {
        this.requireParameterCount(2, params, 'required_unless');

        let data = this.getValue(params[0]);

        let values = params.slice(1);

        if (values.indexOf(data) < 0) {
            return this.validateRequired(name, value);
        }

        return true;
    }

    getPresentCount(names) {
        let count = 0;
        names.forEach((name) => {
            if (typeof(this._data[name]) !== 'undefined') {
                count++;
            }
        })

        return count;
    }

    validateMatch(name, value, params) {
        if (!(params instanceof Array)) {
            params = [params];
        }

        if (!(value instanceof Array)) {
            value = [value];
        }

        let re = params[0];

        if (!(re instanceof RegExp)) {
            re = re.split('/');
            re = new RegExp(re[1], re[2]);
        }

        return re.test(value);
    }

    validateRegex(name, value, params) {
        return this.validateMatch(name, value, params);;
    }

    validateAccepted(name, value) {
        let acceptable = ['yes', 'on', '1', 1, true, 'true'];

        return this.validateRequired(name, value) && (acceptable.indexOf(value) >= 0);
    }

    validateArray(name, value) {
        if (typeof(this._data[name]) === 'undefined') {
            return true;
        }

        return value === null || Array.isArray(value);
    }

    validateIdentical(name, value, params) {
        return this.validateSame(name, value, params);
    }

    validateConfirmed(name, value) {
        return this.validateSame(name, value, [name + '_confirmation']);
    }

    validateSame(name, value, params) {
        this.requireParameterCount(1, params, 'same');
        let other = this._data[params[0]];

        return typeof(other) !== 'undefined' && value === other;
    }

    validateDifferent(name, value, params) {
        this.requireParameterCount(1, params, 'different');
        let other = this._data[params[0]];

        return typeof(other) !== 'undefined' && value !== other;
    }

    validateDigits(name, value, params) {
        this.requireParameterCount(1, params, 'digits');

        return this.validateNumeric(name, value)
            && value.toString().length == params[0];
    }

    validateDigitsBetween(name, value, params) {
        this.requireParameterCount(2, params, 'digits_between');

        let len = value.toString().length;

        return this.validateNumeric(name, value)
            && len >= params[0] && len <= params[1];
    }

    validateSize(name, value, params) {
        this.requireParameterCount(1, params, 'size');

        return this.getSize(name, value) == params[0];
    }

    validateBetween(name, value, params) {
        this.requireParameterCount(2, params, 'between');

        let size = this.getSize(name, value);

        return size >= params[0] && size <= params[1];
    }

    validateMin(name, value, params) {
        this.requireParameterCount(1, params, 'min');

        return this.getSize(name, value) >= params[0];
    }

    validateMax(name, value, params) {
        this.requireParameterCount(1, params, 'max');

        return this.getSize(name, value) <= params[0];
    }

    getSize(name, value) {
        let hasNumeric = this.hasRule(name, this.numericRules);

        if (hasNumeric && !isNaN(parseFloat(value))) {
            return parseFloat(value);
        }

        // for array and string
        return value.length;
    }

    validateIn(name, value, params) {
        if (Array.isArray(value) && this.hasRule(name, 'Array')) {
            let arr = this.arrayDiff(value, params);
            return arr.length === 0;
        }

        return params.indexOf(value) >= 0;
    }

    arrayDiff(arr1, arr2) {
        let diff = [];
        arr1.forEach((item) => {
            if (arr2.indexOf(item) < 0) {
                diff.push(item);
            }
        })
        return diff;
    }

    validateNotIn(name, value, params) {
        this.requireParameterCount(1, params, 'not_in');

        return ! this.validateIn(name, value, params);
    }

    validateNumeric(name, value) {
        return this.validateMatch(name, value, /^-?\d+(\.\d*)?$/);
    }

    validateInteger(name, value) {
        return this.validateMatch(name, value, /^-?\d+$/);
    }

    validateString(name, value) {
        if (! this.hasData(name)) {
            return true;
        }

        return value === null || typeof(value) === 'string';
    }

    validateEmail(name, value) {
        return this.validateMatch(name, value, /^[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,4}$/i);
    }

    validateIp(name, value) {
        let segments = value.split('.');
        return (segments.length === 4 &&
            this.validateBetween(name, segments[0], [1, 255]) &&
            this.validateBetween(name, segments[1], [0, 255]) &&
            this.validateBetween(name, segments[2], [0, 255]) &&
            this.validateBetween(name, segments[3], [1, 255])
        );
    }

    validateUrl(name, value) {
        return this.validateMatch(name, value, /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/i);
    }

    validateAlpha(name, value) {
        return this.validateMatch(name, value, /^([a-z])+$/i);
    }

    validateAlphaNum(name, value) {
        return this.validateMatch(name, value, /^([a-z0-9])+$/i);
    }

    validateAlphaDash(name, value) {
        return this.validateMatch(name, value, /^([a-z0-9_\-])+$/i);
    }

    validateBefore(name, value, params) {
        this.requireParameterCount(1, params, 'before');

        if (typeof(value) !== 'string' && typeof(value) !== 'number' && !(value instanceof Date)) {
            return false;
        }

        let date = this.hasData(params[0]) ? this.getValue(params[0]) : params[0];

        if( ! this.validateDate(name, date)) {
            console.error(params[0] + ' does not appear to be a date.');
            return false;
        }

        return (Date.parse(value) < Date.parse(date));
    }

    validateAfter(name, value, params) {
        this.requireParameterCount(1, params, 'after');

        if (typeof(value) !== 'string' && typeof(value) !== 'number' && !(value instanceof Date)) {
            return false;
        }

        let date = this.hasData(params[0]) ? this.getValue(params[0]) : params[0];

        if( ! this.validateDate(name, date)) {
            console.error(params[0] + ' does not appear to be a date.');
            return false;
        }

        return (Date.parse(value) > Date.parse(date));
    }

    validateDate(name, value) {
        if (value instanceof Date) {
            return true;
        }

        if (typeof(value) !== 'string' && typeof(value) !== 'number') {
            return false;
        }

        return ! isNaN(Date.parse(value));
    }

    validateBoolean(name, value) {
        if (! this.hasData(name)) {
            return true;
        }

        let acceptable = [true, false, 0, 1, '0', '1'];

        return value === null || acceptable.indexOf(value) >= 0;
    }

    validateJson(name, value) {
        try {
            JSON.parse(value);
            return true;
        } catch(err) {
            return false;
        }
    }

    /*---- Replacers ----*/
    strReplace(find, replace, string) {
        if (! Array.isArray(find)) {
            find = [find];
        }
        if (! Array.isArray(replace)) {
            replace = [replace];
        }
        for (let i = 0; i < find.length; i++) {
            string = string.replace(find[i], replace[i]);
        }

        return string;
    }

    getDisplayableValue(name, value) {
        if (typeof(this._customValues[name]) !== 'undefined' &&
            typeof(this._customValues[name][value]) !== 'undefined') {
            return this._customValues[name][value];
        }

        return value;
    }

    // getAttributeList
    getDataNameList(values) {
        let names = [];
        for (let key in values) {
            names.push({
                key : this.getDataName(values[key]),
            });
        }

        return names;
    }

    // getAttribute
    getDataName(name) {
        if (typeof(this._customNames[name]) !== 'undefined') {
            return this._customNames[name];
        }

        return this.strReplace('_', ' ', this.snakeCase(name));
    }

    setCustomNames(customNames) {
        this._customNames = Object.assign({}, customNames);

        return this;
    }

    addCustomNames(customNames) {
        customNames = Object.assign({}, customNames);
        for (let key in customNames) {
            this._customNames[key] = customNames[key];
        }

        return this;
    }

    getCustomValues() {
        return this._customValues;
    }

    addCustomValues(customValues) {
        customValues = Object.assign({}, customValues);
        for (let key in customValues) {
            this._customValues[key] = customValues[key];
        }

        return this;
    }

    setCustomValues(customValues) {
        this._customValues = Object.assign({}, customValues);
        return this;
    }

    setCustomMessages(customMessages) {
        this._customMessages = Object.assign({}, customMessages);

        return this;
    }

    failed() {
        return this._failedRules;
    }

    replaceBetween(msg, name, rule, params) {
        return this.strReplace([':min', ':max'], params, msg);
    }

    replaceDifferent(msg, name, rule, params) {
        return this.replaceSame(msg, name, rule, params);
    }

    replaceDigits(msg, name, rule, params) {
        return this.strReplace(':digits', params[0], msg);
    }

    replaceDigitsBetween(msg, name, rule, params) {
        return this.replaceBetween(msg, name, rule, params);
    }

    replaceMin(msg, name, rule, params) {
      return this.strReplace(':min', params[0], msg);
    }

    replaceMax(msg, name, rule, params) {
        return this.strReplace(':max', params[0], msg);
    }

    replaceIn(msg, name, rule, params) {
        params = params.map((value) => {
            return this.getDisplayableValue(name, value);
        })

        return this.strReplace(':values', params.join(', '), msg);
    }

    replaceNotIn(msg, name, rule, params) {
        return this.replaceIn(msg, name, rule, params);
    }

    replaceRequiredWith(msg, name, rule, params) {
        params = this.getDataNameList(params);

        return this.strReplace(':values', params.join(' / '), msg);
    }

    replaceRequiredWithAll(msg, name, rule, params) {
        return this.replaceRequiredWith(msg, name, rule, params);
    }

    replaceRequiredWithout(msg, name, rule, params) {
        return this.replaceRequiredWith(msg, name, rule, params);
    }

    replaceRequiredWithoutAll(msg, name, rule, params) {
        return this.replaceRequiredWith(msg, name, rule, params);
    }

    replaceRequiredIf(msg, name, rule, params) {
        params[1] = this.getDisplayableValue(params[0], this._data[params[0]]);

        params[0] = this.getDataName(params[0]);

        return this.strReplace([':other', ':value'], params, msg);
    }

    replaceRequiredUnless(msg, name, rule, params) {
        let other = this.getDataName(params.shift());

        return this.strReplace([':other', ':values'], [other, params.join(', ')], msg);
    }

    replaceSame(msg, name, rule, params) {
        return this.strReplace(':other', name, msg);
    }

    replaceIdentical(msg, name, rule, params) {
        return this.strReplace(':other', this.getDataName(params[0]), msg);
    }

    replaceSize(msg, name, rule, params) {
        return this.strReplace(':size', params[0], msg);
    }

    replaceBefore(msg, name, rule, params) {
        if (isNaN(Date.parse(params[0]))) {
            return this.strReplace(':date', this.getDataName(params[0]), msg);
        }

        return this.strReplace(':date', params[0], msg);
    }

    replaceAfter(msg, name, rule, params) {
        return this.replaceBefore(msg, name, rule, params);
    }

    dependsOnOtherFields(rule) {
        return this.dependentRules.indexOf(rule);
    }
}
