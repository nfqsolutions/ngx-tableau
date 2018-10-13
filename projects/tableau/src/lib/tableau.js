/*! tableau-2.2.0 */
(function() {
    /*! BEGIN MscorlibSlim */
    var global = {};
    (function(global) {
        "use strict";
        var ss = {
            __assemblies: {}
        };
        ss.initAssembly = function assembly(obj, name, res) {
            res = res || {};
            obj.name = name;
            obj.toString = function() {
                return this.name
            };
            obj.__types = {};
            obj.getResourceNames = function() {
                return Object.keys(res)
            };
            obj.getResourceDataBase64 = function(name) {
                return res[name] || null
            };
            obj.getResourceData = function(name) {
                var r = res[name];
                return r ? ss.dec64(r) : null
            };
            ss.__assemblies[name] = obj
        };
        ss.initAssembly(ss, 'mscorlib');
        ss.getAssemblies = function ss$getAssemblies() {
            return Object.keys(ss.__assemblies).map(function(n) {
                return ss.__assemblies[n]
            })
        };
        ss.isNullOrUndefined = function ss$isNullOrUndefined(o) {
            return (o === null) || (o === undefined)
        };
        ss.isValue = function ss$isValue(o) {
            return (o !== null) && (o !== undefined)
        };
        ss.referenceEquals = function ss$referenceEquals(a, b) {
            return ss.isValue(a) ? a === b : !ss.isValue(b)
        };
        ss.mkdict = function ss$mkdict() {
            var a = (arguments.length != 1 ? arguments : arguments[0]);
            var r = {};
            for (var i = 0; i < a.length; i += 2) {
                r[a[i]] = a[i + 1]
            }
            return r
        };
        ss.clone = function ss$clone(t, o) {
            return o ? t.$clone(o) : o
        };
        ss.coalesce = function ss$coalesce(a, b) {
            return ss.isValue(a) ? a : b
        };
        ss.isDate = function ss$isDate(obj) {
            return Object.prototype.toString.call(obj) === '[object Date]'
        };
        ss.isArray = function ss$isArray(obj) {
            return Object.prototype.toString.call(obj) === '[object Array]'
        };
        ss.isTypedArrayType = function ss$isTypedArrayType(type) {
            return ['Float32Array', 'Float64Array', 'Int8Array', 'Int16Array', 'Int32Array', 'Uint8Array', 'Uint16Array', 'Uint32Array', 'Uint8ClampedArray'].indexOf(ss.getTypeFullName(type)) >= 0
        };
        ss.isArrayOrTypedArray = function ss$isArray(obj) {
            return ss.isArray(obj) || ss.isTypedArrayType(ss.getInstanceType(obj))
        };
        ss.getHashCode = function ss$getHashCode(obj) {
            if (!ss.isValue(obj)) throw new ss_NullReferenceException('Cannot get hash code of null');
            else if (typeof(obj.getHashCode) === 'function') return obj.getHashCode();
            else if (typeof(obj) === 'boolean') {
                return obj ? 1 : 0
            } else if (typeof(obj) === 'number') {
                var s = obj.toExponential();
                s = s.substr(0, s.indexOf('e'));
                return parseInt(s.replace('.', ''), 10) & 0xffffffff
            } else if (typeof(obj) === 'string') {
                var res = 0;
                for (var i = 0; i < obj.length; i++) res = (res * 31 + obj.charCodeAt(i)) & 0xffffffff;
                return res
            } else if (ss.isDate(obj)) {
                return obj.valueOf() & 0xffffffff
            } else {
                return ss.defaultHashCode(obj)
            }
        };
        ss.defaultHashCode = function ss$defaultHashCode(obj) {
            return obj.$__hashCode__ || (obj.$__hashCode__ = (Math.random() * 0x100000000) | 0)
        };
        ss.equals = function ss$equals(a, b) {
            if (!ss.isValue(a)) throw new ss_NullReferenceException('Object is null');
            else if (a !== ss && typeof(a.equals) === 'function') return a.equals(b);
            if (ss.isDate(a) && ss.isDate(b)) return a.valueOf() === b.valueOf();
            else if (typeof(a) === 'function' && typeof(b) === 'function') return ss.delegateEquals(a, b);
            else if (ss.isNullOrUndefined(a) && ss.isNullOrUndefined(b)) return true;
            else return a === b
        };
        ss.compare = function ss$compare(a, b) {
            if (!ss.isValue(a)) throw new ss_NullReferenceException('Object is null');
            else if (typeof(a) === 'number' || typeof(a) === 'string' || typeof(a) === 'boolean') return a < b ? -1 : (a > b ? 1 : 0);
            else if (ss.isDate(a)) return ss.compare(a.valueOf(), b.valueOf());
            else return a.compareTo(b)
        };
        ss.equalsT = function ss$equalsT(a, b) {
            if (!ss.isValue(a)) throw new ss_NullReferenceException('Object is null');
            else if (typeof(a) === 'number' || typeof(a) === 'string' || typeof(a) === 'boolean') return a === b;
            else if (ss.isDate(a)) return a.valueOf() === b.valueOf();
            else return a.equalsT(b)
        };
        ss.staticEquals = function ss$staticEquals(a, b) {
            if (!ss.isValue(a)) return !ss.isValue(b);
            else return ss.isValue(b) ? ss.equals(a, b) : false
        };
        ss.shallowCopy = function ss$shallowCopy(source, target) {
            var keys = Object.keys(source);
            for (var i = 0, l = keys.length; i < l; i++) {
                var k = keys[i];
                target[k] = source[k]
            }
        };
        ss.isLower = function ss$isLower(c) {
            var s = String.fromCharCode(c);
            return s === s.toLowerCase() && s !== s.toUpperCase()
        };
        ss.isUpper = function ss$isUpper(c) {
            var s = String.fromCharCode(c);
            return s !== s.toLowerCase() && s === s.toUpperCase()
        };
        if (typeof(window) == 'object') {
            if (!window.Element) {
                window.Element = function() {};
                window.Element.isInstanceOfType = function(instance) {
                    return instance && typeof instance.constructor === 'undefined' && typeof instance.tagName === 'string'
                }
            }
            window.Element.__typeName = 'Element'
        }
        ss.clearKeys = function ss$clearKeys(d) {
            for (var n in d) {
                if (d.hasOwnProperty(n)) delete d[n]
            }
        };
        ss.keyExists = function ss$keyExists(d, key) {
            return d[key] !== undefined
        };
        if (!Object.keys) {
            Object.keys = (function() {
                var hasOwnProperty = Object.prototype.hasOwnProperty,
                    hasDontEnumBug = !({
                        toString: null
                    }).propertyIsEnumerable('toString'),
                    dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
                    dontEnumsLength = dontEnums.length;
                return function(obj) {
                    if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                        throw new TypeError('Object.keys called on non-object')
                    }
                    var result = [],
                        prop, i;
                    for (prop in obj) {
                        if (hasOwnProperty.call(obj, prop)) {
                            result.push(prop)
                        }
                    }
                    if (hasDontEnumBug) {
                        for (i = 0; i < dontEnumsLength; i++) {
                            if (hasOwnProperty.call(obj, dontEnums[i])) {
                                result.push(dontEnums[i])
                            }
                        }
                    }
                    return result
                }
            }())
        }
        ss.getKeyCount = function ss$getKeyCount(d) {
            return Object.keys(d).length
        };
        ss.__genericCache = {};
        ss._makeGenericTypeName = function ss$_makeGenericTypeName(genericType, typeArguments) {
            var result = genericType.__typeName;
            for (var i = 0; i < typeArguments.length; i++) result += (i === 0 ? '[' : ',') + '[' + ss.getTypeQName(typeArguments[i]) + ']';
            result += ']';
            return result
        };
        ss.makeGenericType = function ss$makeGenericType(genericType, typeArguments) {
            var name = ss._makeGenericTypeName(genericType, typeArguments);
            return ss.__genericCache[name] || genericType.apply(null, typeArguments)
        };
        ss.registerGenericClassInstance = function ss$registerGenericClassInstance(instance, genericType, typeArguments, members, baseType, interfaceTypes) {
            var name = ss._makeGenericTypeName(genericType, typeArguments);
            ss.__genericCache[name] = instance;
            instance.__typeName = name;
            instance.__genericTypeDefinition = genericType;
            instance.__typeArguments = typeArguments;
            ss.initClass(instance, genericType.__assembly, members, baseType(), interfaceTypes())
        };
        ss.registerGenericInterfaceInstance = function ss$registerGenericInterfaceInstance(instance, genericType, typeArguments, members, baseInterfaces) {
            var name = ss._makeGenericTypeName(genericType, typeArguments);
            ss.__genericCache[name] = instance;
            instance.__typeName = name;
            instance.__genericTypeDefinition = genericType;
            instance.__typeArguments = typeArguments;
            ss.initInterface(instance, genericType.__assembly, members, baseInterfaces())
        };
        ss.isGenericTypeDefinition = function ss$isGenericTypeDefinition(type) {
            return type.__isGenericTypeDefinition || false
        };
        ss.getGenericTypeDefinition = function ss$getGenericTypeDefinition(type) {
            return type.__genericTypeDefinition || null
        };
        ss.getGenericParameterCount = function ss$getGenericParameterCount(type) {
            return type.__typeArgumentCount || 0
        };
        ss.getGenericArguments = function ss$getGenericArguments(type) {
            return type.__typeArguments || null
        };
        ss.setMetadata = function ss$_setMetadata(type, metadata) {
            if (metadata.members) {
                for (var i = 0; i < metadata.members.length; i++) {
                    var m = metadata.members[i];
                    m.typeDef = type;
                    if (m.adder) m.adder.typeDef = type;
                    if (m.remover) m.remover.typeDef = type;
                    if (m.getter) m.getter.typeDef = type;
                    if (m.setter) m.setter.typeDef = type
                }
            }
            type.__metadata = metadata;
            if (metadata.variance) {
                type.isAssignableFrom = function(source) {
                    var check = function(target, type) {
                        if (type.__genericTypeDefinition === target.__genericTypeDefinition && type.__typeArguments.length == target.__typeArguments.length) {
                            for (var i = 0; i < target.__typeArguments.length; i++) {
                                var v = target.__metadata.variance[i],
                                    t = target.__typeArguments[i],
                                    s = type.__typeArguments[i];
                                switch (v) {
                                    case 1:
                                        if (!ss.isAssignableFrom(t, s)) return false;
                                        break;
                                    case 2:
                                        if (!ss.isAssignableFrom(s, t)) return false;
                                        break;
                                    default:
                                        if (s !== t) return false
                                }
                            }
                            return true
                        }
                        return false
                    };
                    if (source.__interface && check(this, source)) return true;
                    var ifs = ss.getInterfaces(source);
                    for (var i = 0; i < ifs.length; i++) {
                        if (ifs[i] === this || check(this, ifs[i])) return true
                    }
                    return false
                }
            }
        };
        ss.setMetadata = function ss$_setMetadata(type, metadata) {};
        ss.initClass = function ss$initClass(ctor, asm, members, baseType, interfaces) {
            ctor.__class = true;
            ctor.__assembly = asm;
            if (!ctor.__typeArguments) asm.__types[ctor.__typeName] = ctor;
            if (baseType && baseType !== Object) {
                var f = function() {};
                f.prototype = baseType.prototype;
                ctor.prototype = new f;
                ctor.prototype.constructor = ctor
            }
            ss.shallowCopy(members, ctor.prototype);
            if (interfaces) ctor.__interfaces = interfaces
        };
        ss.initGenericClass = function ss$initGenericClass(ctor, asm, typeArgumentCount) {
            ctor.__class = true;
            ctor.__assembly = asm;
            asm.__types[ctor.__typeName] = ctor;
            ctor.__typeArgumentCount = typeArgumentCount;
            ctor.__isGenericTypeDefinition = true
        };
        ss.initInterface = function ss$initInterface(ctor, asm, members, baseInterfaces) {
            ctor.__interface = true;
            ctor.__assembly = asm;
            if (!ctor.__typeArguments) asm.__types[ctor.__typeName] = ctor;
            if (baseInterfaces) ctor.__interfaces = baseInterfaces;
            ss.shallowCopy(members, ctor.prototype);
            ctor.isAssignableFrom = function(type) {
                return ss.contains(ss.getInterfaces(type), this)
            }
        };
        ss.initGenericInterface = function ss$initGenericClass(ctor, asm, typeArgumentCount) {
            ctor.__interface = true;
            ctor.__assembly = asm;
            asm.__types[ctor.__typeName] = ctor;
            ctor.__typeArgumentCount = typeArgumentCount;
            ctor.__isGenericTypeDefinition = true
        };
        ss.initEnum = function ss$initEnum(ctor, asm, members, namedValues) {
            ctor.__enum = true;
            ctor.__assembly = asm;
            asm.__types[ctor.__typeName] = ctor;
            ss.shallowCopy(members, ctor.prototype);
            ctor.getDefaultValue = ctor.createInstance = function() {
                return namedValues ? null : 0
            };
            ctor.isInstanceOfType = function(instance) {
                return typeof(instance) == (namedValues ? 'string' : 'number')
            }
        };
        ss.getBaseType = function ss$getBaseType(type) {
            if (type === Object || type.__interface) {
                return null
            } else if (Object.getPrototypeOf) {
                return Object.getPrototypeOf(type.prototype).constructor
            } else {
                var p = type.prototype;
                if (Object.prototype.hasOwnProperty.call(p, 'constructor')) {
                    try {
                        var ownValue = p.constructor;
                        delete p.constructor;
                        return p.constructor
                    } finally {
                        p.constructor = ownValue
                    }
                }
                return p.constructor
            }
        };
        ss.getTypeFullName = function ss$getTypeFullName(type) {
            return type.__typeName || type.name || (type.toString().match(/^\s*function\s*([^\s(]+)/) || [])[1] || 'Object'
        };
        ss.getTypeQName = function ss$getTypeFullName(type) {
            return ss.getTypeFullName(type) + (type.__assembly ? ', ' + type.__assembly.name : '')
        };
        ss.getTypeName = function ss$getTypeName(type) {
            var fullName = ss.getTypeFullName(type);
            var bIndex = fullName.indexOf('[');
            var nsIndex = fullName.lastIndexOf('.', bIndex >= 0 ? bIndex : fullName.length);
            return nsIndex > 0 ? fullName.substr(nsIndex + 1) : fullName
        };
        ss.getTypeNamespace = function ss$getTypeNamespace(type) {
            var fullName = ss.getTypeFullName(type);
            var bIndex = fullName.indexOf('[');
            var nsIndex = fullName.lastIndexOf('.', bIndex >= 0 ? bIndex : fullName.length);
            return nsIndex > 0 ? fullName.substr(0, nsIndex) : ''
        };
        ss.getTypeAssembly = function ss$getTypeAssembly(type) {
            if (ss.contains([Date, Number, Boolean, String, Function, Array], type)) return ss;
            else return type.__assembly || null
        };
        ss._getAssemblyType = function ss$_getAssemblyType(asm, name) {
            var result = [];
            if (asm.__types) {
                return asm.__types[name] || null
            } else {
                var a = name.split('.');
                for (var i = 0; i < a.length; i++) {
                    asm = asm[a[i]];
                    if (!ss.isValue(asm)) return null
                }
                if (typeof asm !== 'function') return null;
                return asm
            }
        };
        ss.getAssemblyTypes = function ss$getAssemblyTypes(asm) {
            var result = [];
            if (asm.__types) {
                for (var t in asm.__types) {
                    if (asm.__types.hasOwnProperty(t)) result.push(asm.__types[t])
                }
            } else {
                var traverse = function(s, n) {
                    for (var c in s) {
                        if (s.hasOwnProperty(c)) traverse(s[c], c)
                    }
                    if (typeof(s) === 'function' && ss.isUpper(n.charCodeAt(0))) result.push(s)
                };
                traverse(asm, '')
            }
            return result
        };
        ss.createAssemblyInstance = function ss$createAssemblyInstance(asm, typeName) {
            var t = ss.getType(typeName, asm);
            return t ? ss.createInstance(t) : null
        };
        ss.getInterfaces = function ss$getInterfaces(type) {
            if (type.__interfaces) return type.__interfaces;
            else if (type === Date || type === Number) return [ss_IEquatable, ss_IComparable, ss_IFormattable];
            else if (type === Boolean || type === String) return [ss_IEquatable, ss_IComparable];
            else if (type === Array || ss.isTypedArrayType(type)) return [ss_IEnumerable, ss_ICollection, ss_IList];
            else return []
        };
        ss.isInstanceOfType = function ss$isInstanceOfType(instance, type) {
            if (ss.isNullOrUndefined(instance)) return false;
            if (typeof(type.isInstanceOfType) === 'function') return type.isInstanceOfType(instance);
            return ss.isAssignableFrom(type, ss.getInstanceType(instance))
        };
        ss.isAssignableFrom = function ss$isAssignableFrom(target, type) {
            return target === type || (typeof(target.isAssignableFrom) === 'function' && target.isAssignableFrom(type)) || type.prototype instanceof target
        };
        ss.isClass = function Type$isClass(type) {
            return (type.__class == true || type === Array || type === Function || type === RegExp || type === String || type === Error || type === Object)
        };
        ss.isEnum = function Type$isEnum(type) {
            return !!type.__enum
        };
        ss.isFlags = function Type$isFlags(type) {
            return type.__metadata && type.__metadata.enumFlags || false
        };
        ss.isInterface = function Type$isInterface(type) {
            return !!type.__interface
        };
        ss.safeCast = function ss$safeCast(instance, type) {
            if (type === true) return instance;
            else if (type === false) return null;
            else return ss.isInstanceOfType(instance, type) ? instance : null
        };
        ss.cast = function ss$cast(instance, type) {
            if (instance === null || typeof(instance) === 'undefined') return instance;
            else if (type === true || (type !== false && ss.isInstanceOfType(instance, type))) return instance;
            throw new ss_InvalidCastException('Cannot cast object to type ' + ss.getTypeFullName(type))
        };
        ss.getInstanceType = function ss$getInstanceType(instance) {
            if (!ss.isValue(instance)) throw new ss_NullReferenceException('Cannot get type of null');
            try {
                return instance.constructor
            } catch (ex) {
                return Object
            }
        };
        ss._getType = function(typeName, asm, re) {
            var outer = !re;
            re = re || /[[,\]]/g;
            var last = re.lastIndex,
                m = re.exec(typeName),
                tname, targs = [];
            if (m) {
                tname = typeName.substring(last, m.index);
                switch (m[0]) {
                    case '[':
                        if (typeName[m.index + 1] != '[') return null;
                        for (;;) {
                            re.exec(typeName);
                            var t = ss._getType(typeName, global, re);
                            if (!t) return null;
                            targs.push(t);
                            m = re.exec(typeName);
                            if (m[0] === ']') break;
                            else if (m[0] !== ',') return null
                        }
                        m = re.exec(typeName);
                        if (m && m[0] === ',') {
                            re.exec(typeName);
                            if (!(asm = ss.__assemblies[(re.lastIndex > 0 ? typeName.substring(m.index + 1, re.lastIndex - 1) : typeName.substring(m.index + 1)).trim()])) return null
                        }
                        break;
                    case ']':
                        break;
                    case ',':
                        re.exec(typeName);
                        if (!(asm = ss.__assemblies[(re.lastIndex > 0 ? typeName.substring(m.index + 1, re.lastIndex - 1) : typeName.substring(m.index + 1)).trim()])) return null;
                        break
                }
            } else {
                tname = typeName.substring(last)
            }
            if (outer && re.lastIndex) return null;
            var t = ss._getAssemblyType(asm, tname.trim());
            return targs.length ? ss.makeGenericType(t, targs) : t
        };
        ss.getType = function ss$getType(typeName, asm) {
            return typeName ? ss._getType(typeName, asm || global) : null
        };
        ss.getDefaultValue = function ss$getDefaultValue(type) {
            if (typeof(type.getDefaultValue) === 'function') return type.getDefaultValue();
            else if (type === Boolean) return false;
            else if (type === Date) return new Date(0);
            else if (type === Number) return 0;
            return null
        };
        ss.createInstance = function ss$createInstance(type) {
            if (typeof(type.createInstance) === 'function') return type.createInstance();
            else if (type === Boolean) return false;
            else if (type === Date) return new Date(0);
            else if (type === Number) return 0;
            else if (type === String) return '';
            else return new type
        };
        var ss_IFormattable = function IFormattable$() {};
        ss_IFormattable.__typeName = 'ss.IFormattable';
        ss.IFormattable = ss_IFormattable;
        ss.initInterface(ss_IFormattable, ss, {
            format: null
        });
        var ss_IComparable = function IComparable$() {};
        ss_IComparable.__typeName = 'ss.IComparable';
        ss.IComparable = ss_IComparable;
        ss.initInterface(ss_IComparable, ss, {
            compareTo: null
        });
        var ss_IEquatable = function IEquatable$() {};
        ss_IEquatable.__typeName = 'ss.IEquatable';
        ss.IEquatable = ss_IEquatable;
        ss.initInterface(ss_IEquatable, ss, {
            equalsT: null
        });
        ss.isNullOrEmptyString = function ss$isNullOrEmptyString(s) {
            return !s || !s.length
        };
        if (!String.prototype.trim) {
            String.prototype.trim = function String$trim() {
                return ss.trimStartString(ss.trimEndString(this))
            }
        }
        ss.trimEndString = function ss$trimEndString(s, chars) {
            return s.replace(chars ? new RegExp('[' + String.fromCharCode.apply(null, chars) + ']+$') : /\s*$/, '')
        };
        ss.trimStartString = function ss$trimStartString(s, chars) {
            return s.replace(chars ? new RegExp('^[' + String.fromCharCode.apply(null, chars) + ']+') : /^\s*/, '')
        };
        ss.trimString = function ss$trimString(s, chars) {
            return ss.trimStartString(ss.trimEndString(s, chars), chars)
        };
        ss.arrayClone = function ss$arrayClone(arr) {
            if (arr.length === 1) {
                return [arr[0]]
            } else {
                return Array.apply(null, arr)
            }
        };
        if (!Array.prototype.map) {
            Array.prototype.map = function Array$map(callback, instance) {
                var length = this.length;
                var mapped = new Array(length);
                for (var i = 0; i < length; i++) {
                    if (i in this) {
                        mapped[i] = callback.call(instance, this[i], i, this)
                    }
                }
                return mapped
            }
        }
        if (!Array.prototype.some) {
            Array.prototype.some = function Array$some(callback, instance) {
                var length = this.length;
                for (var i = 0; i < length; i++) {
                    if (i in this && callback.call(instance, this[i], i, this)) {
                        return true
                    }
                }
                return false
            }
        }
        if (!Array.prototype.forEach) {
            Array.prototype.forEach = function(callback, thisArg) {
                var T, k;
                if (this == null) {
                    throw new TypeError(' this is null or not defined')
                }
                var O = Object(this);
                var len = O.length >>> 0;
                if (typeof callback !== "function") {
                    throw new TypeError(callback + ' is not a function')
                }
                if (arguments.length > 1) {
                    T = thisArg
                }
                k = 0;
                while (k < len) {
                    var kValue;
                    if (k in O) {
                        kValue = O[k];
                        callback.call(T, kValue, k, O)
                    }
                    k++
                }
            }
        }
        if (!Array.prototype.filter) {
            Array.prototype.filter = function(fun) {
                if (this === void 0 || this === null) {
                    throw new TypeError
                }
                var t = Object(this);
                var len = t.length >>> 0;
                if (typeof fun !== 'function') {
                    throw new TypeError
                }
                var res = [];
                var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
                for (var i = 0; i < len; i++) {
                    if (i in t) {
                        var val = t[i];
                        if (fun.call(thisArg, val, i, t)) {
                            res.push(val)
                        }
                    }
                }
                return res
            }
        }
        ss._delegateContains = function ss$_delegateContains(targets, object, method) {
            for (var i = 0; i < targets.length; i += 2) {
                if (targets[i] === object && targets[i + 1] === method) {
                    return true
                }
            }
            return false
        };
        ss._mkdel = function ss$_mkdel(targets) {
            var delegate = function() {
                if (targets.length == 2) {
                    return targets[1].apply(targets[0], arguments)
                } else {
                    var clone = ss.arrayClone(targets);
                    for (var i = 0; i < clone.length; i += 2) {
                        if (ss._delegateContains(targets, clone[i], clone[i + 1])) {
                            clone[i + 1].apply(clone[i], arguments)
                        }
                    }
                    return null
                }
            };
            delegate._targets = targets;
            return delegate
        };
        ss.mkdel = function ss$mkdel(object, method) {
            if (!object) {
                return method
            }
            return ss._mkdel([object, method])
        };
        ss.delegateCombine = function ss$delegateCombine(delegate1, delegate2) {
            if (!delegate1) {
                if (!delegate2._targets) {
                    return ss.mkdel(null, delegate2)
                }
                return delegate2
            }
            if (!delegate2) {
                if (!delegate1._targets) {
                    return ss.mkdel(null, delegate1)
                }
                return delegate1
            }
            var targets1 = delegate1._targets ? delegate1._targets : [null, delegate1];
            var targets2 = delegate2._targets ? delegate2._targets : [null, delegate2];
            return ss._mkdel(targets1.concat(targets2))
        };
        ss.delegateRemove = function ss$delegateRemove(delegate1, delegate2) {
            if (!delegate1 || (delegate1 === delegate2)) {
                return null
            }
            if (!delegate2) {
                return delegate1
            }
            var targets = delegate1._targets;
            var object = null;
            var method;
            if (delegate2._targets) {
                object = delegate2._targets[0];
                method = delegate2._targets[1]
            } else {
                method = delegate2
            }
            for (var i = 0; i < targets.length; i += 2) {
                if ((targets[i] === object) && (targets[i + 1] === method)) {
                    if (targets.length == 2) {
                        return null
                    }
                    var t = ss.arrayClone(targets);
                    t.splice(i, 2);
                    return ss._mkdel(t)
                }
            }
            return delegate1
        };
        ss.delegateEquals = function ss$delegateEquals(a, b) {
            if (a === b) return true;
            if (!a._targets && !b._targets) return false;
            var ta = a._targets || [null, a],
                tb = b._targets || [null, b];
            if (ta.length != tb.length) return false;
            for (var i = 0; i < ta.length; i++) {
                if (ta[i] !== tb[i]) return false
            }
            return true
        };
        var ss_Enum = function Enum$() {};
        ss_Enum.__typeName = 'ss.Enum';
        ss.Enum = ss_Enum;
        ss.initClass(ss_Enum, ss, {});
        ss_Enum.getValues = function Enum$getValues(enumType) {
            var parts = [];
            var values = enumType.prototype;
            for (var i in values) {
                if (values.hasOwnProperty(i)) parts.push(values[i])
            }
            return parts
        };
        var ss_IEnumerator = function IEnumerator$() {};
        ss_IEnumerator.__typeName = 'ss.IEnumerator';
        ss.IEnumerator = ss_IEnumerator;
        ss.initInterface(ss_IEnumerator, ss, {
            current: null,
            moveNext: null,
            reset: null
        }, [ss_IDisposable]);
        var ss_IEnumerable = function IEnumerable$() {};
        ss_IEnumerable.__typeName = 'ss.IEnumerable';
        ss.IEnumerable = ss_IEnumerable;
        ss.initInterface(ss_IEnumerable, ss, {
            getEnumerator: null
        });
        ss.getEnumerator = function ss$getEnumerator(obj) {
            return obj.getEnumerator ? obj.getEnumerator() : new ss_ArrayEnumerator(obj)
        };
        var ss_ICollection = function ICollection$() {};
        ss_ICollection.__typeName = 'ss.ICollection';
        ss.ICollection = ss_ICollection;
        ss.initInterface(ss_ICollection, ss, {
            get_count: null,
            add: null,
            clear: null,
            contains: null,
            remove: null
        });
        ss.count = function ss$count(obj) {
            return obj.get_count ? obj.get_count() : obj.length
        };
        ss.add = function ss$add(obj, item) {
            if (obj.add) obj.add(item);
            else if (ss.isArray(obj)) obj.push(item);
            else throw new ss_NotSupportedException
        };
        ss.clear = function ss$clear(obj) {
            if (obj.clear) obj.clear();
            else if (ss.isArray(obj)) obj.length = 0;
            else throw new ss_NotSupportedException
        };
        ss.remove = function ss$remove(obj, item) {
            if (obj.remove) return obj.remove(item);
            else if (ss.isArray(obj)) {
                var index = ss.indexOf(obj, item);
                if (index >= 0) {
                    obj.splice(index, 1);
                    return true
                }
                return false
            } else throw new ss_NotSupportedException
        };
        ss.contains = function ss$contains(obj, item) {
            if (obj.contains) return obj.contains(item);
            else return ss.indexOf(obj, item) >= 0
        };
        var ss_IEqualityComparer = function IEqualityComparer$() {};
        ss_IEqualityComparer.__typeName = 'ss.IEqualityComparer';
        ss.IEqualityComparer = ss_IEqualityComparer;
        ss.initInterface(ss_IEqualityComparer, ss, {
            areEqual: null,
            getObjectHashCode: null
        });
        var ss_IComparer = function IComparer$() {};
        ss_IComparer.__typeName = 'ss.IComparer';
        ss.IComparer = ss_IComparer;
        ss.initInterface(ss_IComparer, ss, {
            compare: null
        });
        ss.unbox = function ss$unbox(instance) {
            if (!ss.isValue(instance)) throw new ss_InvalidOperationException('Nullable object must have a value.');
            return instance
        };
        var ss_Nullable$1 = function Nullable$1$(T) {
            var $type = function() {};
            $type.isInstanceOfType = function(instance) {
                return ss.isInstanceOfType(instance, T)
            };
            ss.registerGenericClassInstance($type, ss_Nullable$1, [T], {}, function() {
                return null
            }, function() {
                return []
            });
            return $type
        };
        ss_Nullable$1.__typeName = 'ss.Nullable$1';
        ss.Nullable$1 = ss_Nullable$1;
        ss.initGenericClass(ss_Nullable$1, ss, 1);
        ss_Nullable$1.eq = function Nullable$eq(a, b) {
            return !ss.isValue(a) ? !ss.isValue(b) : (a === b)
        };
        ss_Nullable$1.ne = function Nullable$eq(a, b) {
            return !ss.isValue(a) ? ss.isValue(b) : (a !== b)
        };
        ss_Nullable$1.le = function Nullable$le(a, b) {
            return ss.isValue(a) && ss.isValue(b) && a <= b
        };
        ss_Nullable$1.ge = function Nullable$ge(a, b) {
            return ss.isValue(a) && ss.isValue(b) && a >= b
        };
        ss_Nullable$1.lt = function Nullable$lt(a, b) {
            return ss.isValue(a) && ss.isValue(b) && a < b
        };
        ss_Nullable$1.gt = function Nullable$gt(a, b) {
            return ss.isValue(a) && ss.isValue(b) && a > b
        };
        ss_Nullable$1.sub = function Nullable$sub(a, b) {
            return ss.isValue(a) && ss.isValue(b) ? a - b : null
        };
        ss_Nullable$1.add = function Nullable$add(a, b) {
            return ss.isValue(a) && ss.isValue(b) ? a + b : null
        };
        ss_Nullable$1.mod = function Nullable$mod(a, b) {
            return ss.isValue(a) && ss.isValue(b) ? a % b : null
        };
        ss_Nullable$1.div = function Nullable$divf(a, b) {
            return ss.isValue(a) && ss.isValue(b) ? a / b : null
        };
        ss_Nullable$1.mul = function Nullable$mul(a, b) {
            return ss.isValue(a) && ss.isValue(b) ? a * b : null
        };
        ss_Nullable$1.band = function Nullable$band(a, b) {
            return ss.isValue(a) && ss.isValue(b) ? a & b : null
        };
        ss_Nullable$1.bor = function Nullable$bor(a, b) {
            return ss.isValue(a) && ss.isValue(b) ? a | b : null
        };
        ss_Nullable$1.xor = function Nullable$xor(a, b) {
            return ss.isValue(a) && ss.isValue(b) ? a ^ b : null
        };
        ss_Nullable$1.shl = function Nullable$shl(a, b) {
            return ss.isValue(a) && ss.isValue(b) ? a << b : null
        };
        ss_Nullable$1.srs = function Nullable$srs(a, b) {
            return ss.isValue(a) && ss.isValue(b) ? a >> b : null
        };
        ss_Nullable$1.sru = function Nullable$sru(a, b) {
            return ss.isValue(a) && ss.isValue(b) ? a >>> b : null
        };
        ss_Nullable$1.and = function Nullable$and(a, b) {
            if (a === true && b === true) return true;
            else if (a === false || b === false) return false;
            else return null
        };
        ss_Nullable$1.or = function Nullable$or(a, b) {
            if (a === true || b === true) return true;
            else if (a === false && b === false) return false;
            else return null
        };
        ss_Nullable$1.not = function Nullable$not(a) {
            return ss.isValue(a) ? !a : null
        };
        ss_Nullable$1.neg = function Nullable$neg(a) {
            return ss.isValue(a) ? -a : null
        };
        ss_Nullable$1.pos = function Nullable$pos(a) {
            return ss.isValue(a) ? +a : null
        };
        ss_Nullable$1.cpl = function Nullable$cpl(a) {
            return ss.isValue(a) ? ~a : null
        };
        ss_Nullable$1.lift = function Nullable$lift() {
            for (var i = 0; i < arguments.length; i++) {
                if (!ss.isValue(arguments[i])) return null
            }
            return arguments[0].apply(null, Array.prototype.slice.call(arguments, 1))
        };
        var ss_IList = function IList$() {};
        ss_IList.__typeName = 'ss.IList';
        ss.IList = ss_IList;
        ss.initInterface(ss_IList, ss, {
            get_item: null,
            set_item: null,
            indexOf: null,
            insert: null,
            removeAt: null
        }, [ss_ICollection, ss_IEnumerable]);
        ss.getItem = function ss$getItem(obj, index) {
            return obj.get_item ? obj.get_item(index) : obj[index]
        };
        ss.setItem = function ss$setItem(obj, index, value) {
            obj.set_item ? obj.set_item(index, value) : (obj[index] = value)
        };
        ss.indexOf = function ss$indexOf(obj, item) {
            var itemType = typeof(item);
            if ((!item || typeof(item.equals) !== 'function') && typeof(obj.indexOf) === 'function') {
                return obj.indexOf(item)
            } else if (ss.isArrayOrTypedArray(obj)) {
                for (var i = 0; i < obj.length; i++) {
                    if (ss.staticEquals(obj[i], item)) {
                        return i
                    }
                }
                return -1
            } else return obj.indexOf(item)
        };
        ss.insert = function ss$insert(obj, index, item) {
            if (obj.insert) obj.insert(index, item);
            else if (ss.isArray(obj)) obj.splice(index, 0, item);
            else throw new ss_NotSupportedException
        };
        ss.removeAt = function ss$removeAt(obj, index) {
            if (obj.removeAt) obj.removeAt(index);
            else if (ss.isArray(obj)) obj.splice(index, 1);
            else throw new ss_NotSupportedException
        };
        var ss_IDictionary = function IDictionary$() {};
        ss_IDictionary.__typeName = 'ss.IDictionary';
        ss.IDictionary = ss_IDictionary;
        ss.initInterface(ss_IDictionary, ss, {
            get_item: null,
            set_item: null,
            get_keys: null,
            get_values: null,
            containsKey: null,
            add: null,
            remove: null,
            tryGetValue: null
        }, [ss_IEnumerable]);
        var ss_Int32 = function Int32$() {};
        ss_Int32.__typeName = 'ss.Int32';
        ss.Int32 = ss_Int32;
        ss.initClass(ss_Int32, ss, {}, Object, [ss_IEquatable, ss_IComparable, ss_IFormattable]);
        ss_Int32.__class = false;
        ss_Int32.isInstanceOfType = function Int32$isInstanceOfType(instance) {
            return typeof(instance) === 'number' && isFinite(instance) && Math.round(instance, 0) == instance
        };
        ss_Int32.getDefaultValue = ss_Int32.createInstance = function Int32$getDefaultValue() {
            return 0
        };
        ss_Int32.div = function Int32$div(a, b) {
            if (!ss.isValue(a) || !ss.isValue(b)) return null;
            if (b === 0) throw new ss_DivideByZeroException;
            return ss_Int32.trunc(a / b)
        };
        ss_Int32.trunc = function Int32$trunc(n) {
            return ss.isValue(n) ? (n > 0 ? Math.floor(n) : Math.ceil(n)) : null
        };
        ss_Int32.tryParse = function Int32$tryParse(s, result, min, max) {
            result.$ = 0;
            if (!/^[+-]?[0-9]+$/.test(s)) return 0;
            var n = parseInt(s, 10);
            if (n < min || n > max) return false;
            result.$ = n;
            return true
        };
        var ss_JsDate = function JsDate$() {};
        ss_JsDate.__typeName = 'ss.JsDate';
        ss.JsDate = ss_JsDate;
        ss.initClass(ss_JsDate, ss, {}, Object, [ss_IEquatable, ss_IComparable]);
        ss_JsDate.createInstance = function JsDate$createInstance() {
            return new Date
        };
        ss_JsDate.isInstanceOfType = function JsDate$isInstanceOfType(instance) {
            return instance instanceof Date
        };
        var ss_ArrayEnumerator = function ArrayEnumerator$(array) {
            this._array = array;
            this._index = -1
        };
        ss_ArrayEnumerator.__typeName = 'ss.ArrayEnumerator';
        ss.ArrayEnumerator = ss_ArrayEnumerator;
        ss.initClass(ss_ArrayEnumerator, ss, {
            moveNext: function ArrayEnumerator$moveNext() {
                this._index++;
                return (this._index < this._array.length)
            },
            reset: function ArrayEnumerator$reset() {
                this._index = -1
            },
            current: function ArrayEnumerator$current() {
                if (this._index < 0 || this._index >= this._array.length) throw 'Invalid operation';
                return this._array[this._index]
            },
            dispose: function ArrayEnumerator$dispose() {}
        }, null, [ss_IEnumerator, ss_IDisposable]);
        var ss_ObjectEnumerator = function ObjectEnumerator$(o) {
            this._keys = Object.keys(o);
            this._index = -1;
            this._object = o
        };
        ss_ObjectEnumerator.__typeName = 'ss.ObjectEnumerator';
        ss.ObjectEnumerator = ss_ObjectEnumerator;
        ss.initClass(ss_ObjectEnumerator, ss, {
            moveNext: function ObjectEnumerator$moveNext() {
                this._index++;
                return (this._index < this._keys.length)
            },
            reset: function ObjectEnumerator$reset() {
                this._index = -1
            },
            current: function ObjectEnumerator$current() {
                if (this._index < 0 || this._index >= this._keys.length) throw new ss_InvalidOperationException('Invalid operation');
                var k = this._keys[this._index];
                return {
                    key: k,
                    value: this._object[k]
                }
            },
            dispose: function ObjectEnumerator$dispose() {}
        }, null, [ss_IEnumerator, ss_IDisposable]);
        var ss_EqualityComparer = function EqualityComparer$() {};
        ss_EqualityComparer.__typeName = 'ss.EqualityComparer';
        ss.EqualityComparer = ss_EqualityComparer;
        ss.initClass(ss_EqualityComparer, ss, {
            areEqual: function EqualityComparer$areEqual(x, y) {
                return ss.staticEquals(x, y)
            },
            getObjectHashCode: function EqualityComparer$getObjectHashCode(obj) {
                return ss.isValue(obj) ? ss.getHashCode(obj) : 0
            }
        }, null, [ss_IEqualityComparer]);
        ss_EqualityComparer.def = new ss_EqualityComparer;
        var ss_Comparer = function Comparer$(f) {
            this.f = f
        };
        ss_Comparer.__typeName = 'ss.Comparer';
        ss.Comparer = ss_Comparer;
        ss.initClass(ss_Comparer, ss, {
            compare: function Comparer$compare(x, y) {
                return this.f(x, y)
            }
        }, null, [ss_IComparer]);
        ss_Comparer.def = new ss_Comparer(function Comparer$defaultCompare(a, b) {
            if (!ss.isValue(a)) return !ss.isValue(b) ? 0 : -1;
            else if (!ss.isValue(b)) return 1;
            else return ss.compare(a, b)
        });
        var ss_IDisposable = function IDisposable$() {};
        ss_IDisposable.__typeName = 'ss.IDisposable';
        ss.IDisposable = ss_IDisposable;
        ss.initInterface(ss_IDisposable, ss, {
            dispose: null
        });
        var ss_StringBuilder = function StringBuilder$(s) {
            this._parts = (ss.isValue(s) && s != '') ? [s] : [];
            this.length = ss.isValue(s) ? s.length : 0
        };
        ss_StringBuilder.__typeName = 'ss.StringBuilder';
        ss.StringBuilder = ss_StringBuilder;
        ss.initClass(ss_StringBuilder, ss, {
            append: function StringBuilder$append(o) {
                if (ss.isValue(o)) {
                    var s = o.toString();
                    ss.add(this._parts, s);
                    this.length += s.length
                }
                return this
            },
            appendChar: function StringBuilder$appendChar(c) {
                return this.append(String.fromCharCode(c))
            },
            appendLine: function StringBuilder$appendLine(s) {
                this.append(s);
                this.append('\r\n');
                return this
            },
            appendLineChar: function StringBuilder$appendLineChar(c) {
                return this.appendLine(String.fromCharCode(c))
            },
            clear: function StringBuilder$clear() {
                this._parts = [];
                this.length = 0
            },
            toString: function StringBuilder$toString() {
                return this._parts.join('')
            }
        });
        var ss_EventArgs = function EventArgs$() {};
        ss_EventArgs.__typeName = 'ss.EventArgs';
        ss.EventArgs = ss_EventArgs;
        ss.initClass(ss_EventArgs, ss, {});
        ss_EventArgs.Empty = new ss_EventArgs;
        var ss_Exception = function Exception$(message, innerException) {
            this._message = message || 'An error occurred.';
            this._innerException = innerException || null;
            this._error = new Error
        };
        ss_Exception.__typeName = 'ss.Exception';
        ss.Exception = ss_Exception;
        ss.initClass(ss_Exception, ss, {
            get_message: function Exception$get_message() {
                return this._message
            },
            get_innerException: function Exception$get_innerException() {
                return this._innerException
            },
            get_stack: function Exception$get_stack() {
                return this._error.stack
            },
            toString: function Exception$toString() {
                var message = this._message;
                var exception = this;
                if (ss.isNullOrEmptyString(message)) {
                    if (ss.isValue(ss.getInstanceType(exception)) && ss.isValue(ss.getTypeFullName(ss.getInstanceType(exception)))) {
                        message = ss.getTypeFullName(ss.getInstanceType(exception))
                    } else {
                        message = '[object Exception]'
                    }
                }
                return message
            }
        });
        ss_Exception.wrap = function Exception$wrap(o) {
            if (ss.isInstanceOfType(o, ss_Exception)) {
                return o
            } else if (o instanceof TypeError) {
                return new ss_NullReferenceException(o.message, new ss_JsErrorException(o))
            } else if (o instanceof RangeError) {
                return new ss_ArgumentOutOfRangeException(null, o.message, new ss_JsErrorException(o))
            } else if (o instanceof Error) {
                return new ss_JsErrorException(o)
            } else {
                return new ss_Exception(o.toString())
            }
        };
        var ss_NotImplementedException = function NotImplementedException$(message, innerException) {
            ss_Exception.call(this, message || 'The method or operation is not implemented.', innerException)
        };
        ss_NotImplementedException.__typeName = 'ss.NotImplementedException';
        ss.NotImplementedException = ss_NotImplementedException;
        ss.initClass(ss_NotImplementedException, ss, {}, ss_Exception);
        var ss_NotSupportedException = function NotSupportedException$(message, innerException) {
            ss_Exception.call(this, message || 'Specified method is not supported.', innerException)
        };
        ss_NotSupportedException.__typeName = 'ss.NotSupportedException';
        ss.NotSupportedException = ss_NotSupportedException;
        ss.initClass(ss_NotSupportedException, ss, {}, ss_Exception);
        var ss_AggregateException = function AggregateException$(message, innerExceptions) {
            this.innerExceptions = ss.isValue(innerExceptions) ? ss.arrayFromEnumerable(innerExceptions) : [];
            ss_Exception.call(this, message || 'One or more errors occurred.', this.innerExceptions.length ? this.innerExceptions[0] : null)
        };
        ss_AggregateException.__typeName = 'ss.AggregateException';
        ss.AggregateException = ss_AggregateException;
        ss.initClass(ss_AggregateException, ss, {
            flatten: function AggregateException$flatten() {
                var inner = [];
                for (var i = 0; i < this.innerExceptions.length; i++) {
                    var e = this.innerExceptions[i];
                    if (ss.isInstanceOfType(e, ss_AggregateException)) {
                        inner.push.apply(inner, e.flatten().innerExceptions)
                    } else {
                        inner.push(e)
                    }
                }
                return new ss_AggregateException(this._message, inner)
            }
        }, ss_Exception);
        var ss_PromiseException = function PromiseException(args, message, innerException) {
            ss_Exception.call(this, message || (args.length && args[0] ? args[0].toString() : 'An error occurred'), innerException);
            this.arguments = ss.arrayClone(args)
        };
        ss_PromiseException.__typeName = 'ss.PromiseException';
        ss.PromiseException = ss_PromiseException;
        ss.initClass(ss_PromiseException, ss, {
            get_arguments: function PromiseException$get_arguments() {
                return this._arguments
            }
        }, ss_Exception);
        var ss_JsErrorException = function JsErrorException$(error, message, innerException) {
            ss_Exception.call(this, message || error.message, innerException);
            this.error = error
        };
        ss_JsErrorException.__typeName = 'ss.JsErrorException';
        ss.JsErrorException = ss_JsErrorException;
        ss.initClass(ss_JsErrorException, ss, {
            get_stack: function Exception$get_stack() {
                return this.error.stack
            }
        }, ss_Exception);
        var ss_ArgumentException = function ArgumentException$(message, paramName, innerException) {
            ss_Exception.call(this, message || 'Value does not fall within the expected range.', innerException);
            this.paramName = paramName || null
        };
        ss_ArgumentException.__typeName = 'ss.ArgumentException';
        ss.ArgumentException = ss_ArgumentException;
        ss.initClass(ss_ArgumentException, ss, {}, ss_Exception);
        var ss_ArgumentNullException = function ArgumentNullException$(paramName, message, innerException) {
            if (!message) {
                message = 'Value cannot be null.';
                if (paramName) message += '\nParameter name: ' + paramName
            }
            ss_ArgumentException.call(this, message, paramName, innerException)
        };
        ss_ArgumentNullException.__typeName = 'ss.ArgumentNullException';
        ss.ArgumentNullException = ss_ArgumentNullException;
        ss.initClass(ss_ArgumentNullException, ss, {}, ss_ArgumentException);
        var ss_ArgumentOutOfRangeException = function ArgumentOutOfRangeException$(paramName, message, innerException, actualValue) {
            if (!message) {
                message = 'Value is out of range.';
                if (paramName) message += '\nParameter name: ' + paramName
            }
            ss_ArgumentException.call(this, message, paramName, innerException);
            this.actualValue = actualValue || null
        };
        ss_ArgumentOutOfRangeException.__typeName = 'ss.ArgumentOutOfRangeException';
        ss.ArgumentOutOfRangeException = ss_ArgumentOutOfRangeException;
        ss.initClass(ss_ArgumentOutOfRangeException, ss, {}, ss_ArgumentException);
        var ss_FormatException = function FormatException$(message, innerException) {
            ss_Exception.call(this, message || 'Invalid format.', innerException)
        };
        ss_FormatException.__typeName = 'ss.FormatException';
        ss.FormatException = ss_FormatException;
        ss.initClass(ss_FormatException, ss, {}, ss_Exception);
        var ss_DivideByZeroException = function DivideByZeroException$(message, innerException) {
            ss_Exception.call(this, message || 'Division by 0.', innerException)
        };
        ss_DivideByZeroException.__typeName = 'ss.DivideByZeroException';
        ss.DivideByZeroException = ss_DivideByZeroException;
        ss.initClass(ss_DivideByZeroException, ss, {}, ss_Exception);
        var ss_InvalidCastException = function InvalidCastException$(message, innerException) {
            ss_Exception.call(this, message || 'The cast is not valid.', innerException)
        };
        ss_InvalidCastException.__typeName = 'ss.InvalidCastException';
        ss.InvalidCastException = ss_InvalidCastException;
        ss.initClass(ss_InvalidCastException, ss, {}, ss_Exception);
        var ss_InvalidOperationException = function InvalidOperationException$(message, innerException) {
            ss_Exception.call(this, message || 'Operation is not valid due to the current state of the object.', innerException)
        };
        ss_InvalidOperationException.__typeName = 'ss.InvalidOperationException';
        ss.InvalidOperationException = ss_InvalidOperationException;
        ss.initClass(ss_InvalidOperationException, ss, {}, ss_Exception);
        var ss_NullReferenceException = function NullReferenceException$(message, innerException) {
            ss_Exception.call(this, message || 'Object is null.', innerException)
        };
        ss_NullReferenceException.__typeName = 'ss.NullReferenceException';
        ss.NullReferenceException = ss_NullReferenceException;
        ss.initClass(ss_NullReferenceException, ss, {}, ss_Exception);
        var ss_KeyNotFoundException = function KeyNotFoundException$(message, innerException) {
            ss_Exception.call(this, message || 'Key not found.', innerException)
        };
        ss_KeyNotFoundException.__typeName = 'ss.KeyNotFoundException';
        ss.KeyNotFoundException = ss_KeyNotFoundException;
        ss.initClass(ss_KeyNotFoundException, ss, {}, ss_Exception);
        var ss_AmbiguousMatchException = function AmbiguousMatchException$(message, innerException) {
            ss_Exception.call(this, message || 'Ambiguous match.', innerException)
        };
        ss_AmbiguousMatchException.__typeName = 'ss.AmbiguousMatchException';
        ss.AmbiguousMatchException = ss_AmbiguousMatchException;
        ss.initClass(ss_AmbiguousMatchException, ss, {}, ss_Exception);
        var ss_IteratorBlockEnumerable = function IteratorBlockEnumerable$(getEnumerator, $this) {
            this._getEnumerator = getEnumerator;
            this._this = $this
        };
        ss_IteratorBlockEnumerable.__typeName = 'ss.IteratorBlockEnumerable';
        ss.IteratorBlockEnumerable = ss_IteratorBlockEnumerable;
        ss.initClass(ss_IteratorBlockEnumerable, ss, {
            getEnumerator: function IteratorBlockEnumerable$getEnumerator() {
                return this._getEnumerator.call(this._this)
            }
        }, null, [ss_IEnumerable]);
        var ss_IteratorBlockEnumerator = function IteratorBlockEnumerator$(moveNext, getCurrent, dispose, $this) {
            this._moveNext = moveNext;
            this._getCurrent = getCurrent;
            this._dispose = dispose;
            this._this = $this
        };
        ss_IteratorBlockEnumerator.__typeName = 'ss.IteratorBlockEnumerator';
        ss.IteratorBlockEnumerator = ss_IteratorBlockEnumerator;
        ss.initClass(ss_IteratorBlockEnumerator, ss, {
            moveNext: function IteratorBlockEnumerator$moveNext() {
                try {
                    return this._moveNext.call(this._this)
                } catch (ex) {
                    if (this._dispose) this._dispose.call(this._this);
                    throw ex
                }
            },
            current: function IteratorBlockEnumerator$current() {
                return this._getCurrent.call(this._this)
            },
            reset: function IteratorBlockEnumerator$reset() {
                throw new ss_NotSupportedException('Reset is not supported.')
            },
            dispose: function IteratorBlockEnumerator$dispose() {
                if (this._dispose) this._dispose.call(this._this)
            }
        }, null, [ss_IEnumerator, ss_IDisposable]);
        var ss_Lazy = function Lazy$(valueFactory) {
            this._valueFactory = valueFactory;
            this.isValueCreated = false
        };
        ss_Lazy.__typeName = 'ss.Lazy';
        ss.Lazy = ss_Lazy;
        ss.initClass(ss_Lazy, ss, {
            value: function Lazy$value() {
                if (!this.isValueCreated) {
                    this._value = this._valueFactory();
                    delete this._valueFactory;
                    this.isValueCreated = true
                }
                return this._value
            }
        });
        if (typeof(global.HTMLElement) === 'undefined') {
            global.HTMLElement = Element
        }
        if (typeof(global.MessageEvent) === 'undefined') {
            global.MessageEvent = Event
        }
        Date.now = Date.now || function() {
            return +new Date
        };
        global.ss = ss
    })(global);
    var ss = global.ss;
    var HTMLElement = global.HTMLElement;
    var MessageEvent = global.MessageEvent;
    /*! BEGIN CoreSlim */
    (function() {
        'dont use strict';
        var a = {};
        global.tab = global.tab || {};
        ss.initAssembly(a, 'tabcoreslim');
        var b = function() {};
        b.__typeName = 'tab.EscapingUtil';
        b.escapeHtml = function(e) {
            var f = ss.coalesce(e, '');
            f = f.replace(new RegExp('&', 'g'), '&amp;');
            f = f.replace(new RegExp('<', 'g'), '&lt;');
            f = f.replace(new RegExp('>', 'g'), '&gt;');
            f = f.replace(new RegExp('"', 'g'), '&quot;');
            f = f.replace(new RegExp("'", 'g'), '&#39;');
            f = f.replace(new RegExp('/', 'g'), '&#47;');
            return f
        };
        global.tab.EscapingUtil = b;
        var c = function() {};
        c.__typeName = 'tab.ScriptEx';
        global.tab.ScriptEx = c;
        var d = function(e) {
            this.$0 = null;
            this.$0 = e
        };
        d.__typeName = 'tab.WindowHelper';
        d.get_windowSelf = function() {
            return window.self
        };
        d.get_selection = function() {
            if (typeof(window['getSelection']) === 'function') {
                return window.getSelection()
            } else if (typeof(document['getSelection']) === 'function') {
                return document.getSelection()
            }
            return null
        };
        d.close = function(e) {
            e.close()
        };
        d.getOpener = function(e) {
            return e.opener
        };
        d.getLocation = function(e) {
            return e.location
        };
        d.getPathAndSearch = function(e) {
            return e.location.pathname + e.location.search
        };
        d.setLocationHref = function(e, f) {
            e.location.href = f
        };
        d.locationReplace = function(e, f) {
            e.location.replace(f)
        };
        d.open = function(e, f, g) {
            return window.open(e, f, g)
        };
        d.reload = function(e, f) {
            e.location.reload(f)
        };
        d.requestAnimationFrame = function(e) {
            return d.$c(e)
        };
        d.cancelAnimationFrame = function(e) {
            if (ss.isValue(e)) {
                d.$b(e)
            }
        };
        d.setTimeout = function(e, f) {
            return window.setTimeout(e, f)
        };
        d.setInterval = function(e, f) {
            return window.setInterval(e, f)
        };
        d.addListener = function(e, f, g) {
            if ('addEventListener' in e) {
                e.addEventListener(f, g, false)
            } else {
                e.attachEvent('on' + f, g)
            }
        };
        d.removeListener = function(e, f, g) {
            if ('removeEventListener' in e) {
                e.removeEventListener(f, g, false)
            } else {
                e.detachEvent('on' + f, g)
            }
        };
        d.$0 = function() {
            var e = 0;
            d.$c = function(f) {
                var g = (new Date).getTime();
                var h = Math.max(0, 16 - (g - e));
                e = g + h;
                var i = window.setTimeout(f, h);
                return i
            }
        };
        d.clearSelection = function() {
            var e = d.get_selection();
            if (ss.isValue(e)) {
                if (typeof(e['removeAllRanges']) === 'function') {
                    e.removeAllRanges()
                } else if (typeof(e['empty']) === 'function') {
                    e['empty']()
                }
            }
        };
        global.tab.WindowHelper = d;
        ss.initClass(b, a, {});
        ss.initClass(c, a, {});
        ss.initClass(d, a, {
            get_pageXOffset: function() {
                return d.$7(this.$0)
            },
            get_pageYOffset: function() {
                return d.$8(this.$0)
            },
            get_clientWidth: function() {
                return d.$2(this.$0)
            },
            get_clientHeight: function() {
                return d.$1(this.$0)
            },
            get_innerWidth: function() {
                return d.$4(this.$0)
            },
            get_outerWidth: function() {
                return d.$6(this.$0)
            },
            get_innerHeight: function() {
                return d.$3(this.$0)
            },
            get_outerHeight: function() {
                return d.$5(this.$0)
            },
            get_screenLeft: function() {
                return d.$9(this.$0)
            },
            get_screenTop: function() {
                return d.$a(this.$0)
            },
            isQuirksMode: function() {
                return document.compatMode === 'BackCompat'
            }
        });
        (function() {
            d.$4 = null;
            d.$3 = null;
            d.$2 = null;
            d.$1 = null;
            d.$7 = null;
            d.$8 = null;
            d.$9 = null;
            d.$a = null;
            d.$6 = null;
            d.$5 = null;
            d.$c = null;
            d.$b = null;
            if ('innerWidth' in window) {
                d.$4 = function(m) {
                    return m.innerWidth
                }
            } else {
                d.$4 = function(m) {
                    return m.document.documentElement.offsetWidth
                }
            }
            if ('outerWidth' in window) {
                d.$6 = function(m) {
                    return m.outerWidth
                }
            } else {
                d.$6 = d.$4
            }
            if ('innerHeight' in window) {
                d.$3 = function(m) {
                    return m.innerHeight
                }
            } else {
                d.$3 = function(m) {
                    return m.document.documentElement.offsetHeight
                }
            }
            if ('outerHeight' in window) {
                d.$5 = function(m) {
                    return m.outerHeight
                }
            } else {
                d.$5 = d.$3
            }
            if ('clientWidth' in window) {
                d.$2 = function(m) {
                    return m['clientWidth']
                }
            } else {
                d.$2 = function(m) {
                    return m.document.documentElement.clientWidth
                }
            }
            if ('clientHeight' in window) {
                d.$1 = function(m) {
                    return m['clientHeight']
                }
            } else {
                d.$1 = function(m) {
                    return m.document.documentElement.clientHeight
                }
            }
            if (ss.isValue(window.self.pageXOffset)) {
                d.$7 = function(m) {
                    return m.pageXOffset
                }
            } else {
                d.$7 = function(m) {
                    return m.document.documentElement.scrollLeft
                }
            }
            if (ss.isValue(window.self.pageYOffset)) {
                d.$8 = function(m) {
                    return m.pageYOffset
                }
            } else {
                d.$8 = function(m) {
                    return m.document.documentElement.scrollTop
                }
            }
            if ('screenLeft' in window) {
                d.$9 = function(m) {
                    return m.screenLeft
                }
            } else {
                d.$9 = function(m) {
                    return m.screenX
                }
            }
            if ('screenTop' in window) {
                d.$a = function(m) {
                    return m.screenTop
                }
            } else {
                d.$a = function(m) {
                    return m.screenY
                }
            } {
                var e = 'requestAnimationFrame';
                var f = 'cancelAnimationFrame';
                var g = ['ms', 'moz', 'webkit', 'o'];
                var h = null;
                var i = null;
                if (e in window) {
                    h = e
                }
                if (f in window) {
                    i = f
                }
                for (var j = 0; j < g.length && (ss.isNullOrUndefined(h) || ss.isNullOrUndefined(i)); ++j) {
                    var k = g[j];
                    var l = k + 'RequestAnimationFrame';
                    if (ss.isNullOrUndefined(h) && l in window) {
                        h = l
                    }
                    if (ss.isNullOrUndefined(i)) {
                        l = k + 'CancelAnimationFrame';
                        if (l in window) {
                            i = l
                        }
                        l = k + 'CancelRequestAnimationFrame';
                        if (l in window) {
                            i = l
                        }
                    }
                }
                if (ss.isValue(h)) {
                    d.$c = function(m) {
                        return window[h](m)
                    }
                } else {
                    d.$0()
                }
                if (ss.isValue(i)) {
                    d.$b = function(m) {
                        window[i](m)
                    }
                } else {
                    d.$b = function(m) {
                        window.clearTimeout(m)
                    }
                }
            }
        })()
    })();
    var tab = global.tab;
    /*! API */
    (function() {
        'dont use strict';
        var a = {};
        global.tab = global.tab || {};
        global.tableauSoftware = global.tableauSoftware || {};
        ss.initAssembly(a, 'Tableau.JavaScript.Vql.Api');
        var b = function() {
            this.$a = 0;
            this.$9 = {};
            this.$6 = {};
            this.$8 = {};
            this.$7 = {};
            if (L.hasWindowAddEventListener()) {
                window.addEventListener('message', ss.mkdel(this, this.$1), false)
            } else if (L.hasDocumentAttachEvent()) {
                var e = ss.mkdel(this, this.$1);
                document.attachEvent('onmessage', e);
                window.attachEvent('onmessage', e)
            } else {
                window.onmessage = ss.mkdel(this, this.$1)
            }
            this.$a = 0
        };
        b.__typeName = 'tab.$0';
        var c = function() {
            this.$2 = null;
            this.$1$1 = null;
            this.$1$2 = null
        };
        c.__typeName = 'tab.$1';
        var d = function(e, cj) {
            bo.call(this, e, cj)
        };
        d.__typeName = 'tab.$10';
        var f = function(e, cj) {
            this.$2 = null;
            bo.call(this, e, null);
            this.$2 = cj
        };
        f.__typeName = 'tab.$11';
        var g = function(e, cj) {
            this.$2 = null;
            bo.call(this, e, null);
            this.$2 = cj
        };
        g.__typeName = 'tab.$2';
        var h = function(e, cj, ck, cl) {
            this.$3 = null;
            this.$4 = null;
            bo.call(this, e, cj);
            this.$3 = ck;
            this.$4 = cl
        };
        h.__typeName = 'tab.$3';
        var i = function(e, cj) {
            bo.call(this, e, cj)
        };
        i.__typeName = 'tab.$4';
        var j = function() {};
        j.__typeName = 'tab.$5';
        j.isInstanceOfType = function() {
            return true
        };
        var k = function() {};
        k.__typeName = 'tab.$6';
        k.$0 = function(e) {
            var cj;
            if (e instanceof tableauSoftware.Promise) {
                cj = e
            } else {
                if (ss.isValue(e) && typeof(e['valueOf']) === 'function') {
                    e = e['valueOf']()
                }
                if (k.$1(e)) {
                    var ck = new z;
                    e.then(ss.mkdel(ck, ck.resolve), ss.mkdel(ck, ck.reject));
                    cj = ck.get_promise()
                } else {
                    cj = k.$4(e)
                }
            }
            return cj
        };
        k.$2 = function(e) {
            return k.$0(e).then(function(cj) {
                return k.$3(cj)
            }, null)
        };
        k.$4 = function(cj) {
            var ck = new C(function(cl, cm) {
                try {
                    return k.$0((ss.isValue(cl) ? cl(cj) : cj))
                } catch (cn) {
                    var e = ss.Exception.wrap(cn);
                    return k.$3(e)
                }
            });
            return ck
        };
        k.$3 = function(cj) {
            var ck = new C(function(cl, cm) {
                try {
                    return (ss.isValue(cm) ? k.$0(cm(cj)) : k.$3(cj))
                } catch (cn) {
                    var e = ss.Exception.wrap(cn);
                    return k.$3(e)
                }
            });
            return ck
        };
        k.$1 = function(e) {
            return ss.isValue(e) && typeof(e['then']) === 'function'
        };
        var l = function(e) {
            this.$4 = null;
            this.$5 = new tab._Collection;
            this.$6 = 0;
            if (A.isArray(e)) {
                var cj = e;
                for (var ck = 0; ck < cj.length; ck++) {
                    var cl = cj[ck];
                    if (!ss.isValue(cl.fieldName)) {
                        throw J.createInvalidParameter('pair.fieldName')
                    }
                    if (!ss.isValue(cl.value)) {
                        throw J.createInvalidParameter('pair.value')
                    }
                    var cm = new bU(cl.fieldName, cl.value);
                    this.$5._add(cm.fieldName, cm)
                }
            } else {
                this.$6 = e
            }
        };
        l.__typeName = 'tab.$7';
        l.$0 = function(e) {
            var cj = new tab._Collection;
            if (ss.isNullOrUndefined(e) || L.isNullOrEmpty(e.marks)) {
                return cj
            }
            for (var ck = 0; ck < e.marks.length; ck++) {
                var cl = e.marks[ck];
                var cm = cl.tupleId;
                var cn = new bT(cm);
                cj._add(cm.toString(), cn);
                for (var co = 0; co < cl.pairs.length; co++) {
                    var cp = cl.pairs[co];
                    var cq = L.convertRawValue(cp.value, cp.valueDataType);
                    var cr = new bU(cp.fieldName, cq);
                    cr.formattedValue = cp.formattedValue;
                    if (!cn.$0.$2()._has(cr.fieldName)) {
                        cn.$0.$0(cr)
                    }
                }
            }
            return cj
        };
        var m = function(e) {
            this.$i = null;
            this.$h = null;
            this.$c = null;
            this.$d = null;
            this.$b = null;
            this.$a = null;
            this.$g = null;
            this.$f = null;
            this.$j = null;
            this.$e = null;
            this.$h = e.name;
            this.$c = L.getDataValue(e.currentValue);
            this.$d = T.convertParameterDataType(e.dataType);
            this.$b = T.convertParameterAllowableValuesType(e.allowableValuesType);
            if (ss.isValue(e.allowableValues) && this.$b === 'list') {
                this.$a = [];
                for (var cj = 0; cj < e.allowableValues.length; cj++) {
                    var ck = e.allowableValues[cj];
                    this.$a.push(L.getDataValue(ck))
                }
            }
            if (this.$b === 'range') {
                this.$g = L.getDataValue(e.minValue);
                this.$f = L.getDataValue(e.maxValue);
                this.$j = e.stepSize;
                if ((this.$d === 'date' || this.$d === 'datetime') && ss.isValue(this.$j) && ss.isValue(e.dateStepPeriod)) {
                    this.$e = T.convertPeriodType(e.dateStepPeriod)
                }
            }
        };
        m.__typeName = 'tab.$8';
        var n = function() {};
        n.__typeName = 'tab.$9';
        n.$2 = function(e) {
            return function(cj, ck) {
                if (ss.isValue(cj)) {
                    var cl = cj.toString().toUpperCase();
                    var cm = ss.Enum.getValues(e);
                    for (var cn = 0; cn < cm.length; cn++) {
                        var co = cm[cn];
                        var cp = co.toUpperCase();
                        if (ss.referenceEquals(cl, cp)) {
                            ck.$ = co;
                            return true
                        }
                    }
                }
                ck.$ = ss.getDefaultValue(e);
                return false
            }
        };
        n.$1 = function(e) {
            return function(cj, ck) {
                var cl = {};
                if (!n.$2(e).call(null, cj, cl)) {
                    throw J.createInvalidParameter(ck)
                }
                return cl.$
            }
        };
        n.$0 = function(e) {
            return function(cj) {
                var ck = {};
                var cl = n.$2(e).call(null, cj, ck);
                return cl
            }
        };
        var o = function() {};
        o.__typeName = 'tab._ApiBootstrap';
        o.initialize = function() {
            q.registerCrossDomainMessageRouter(function() {
                return new b
            })
        };
        global.tab._ApiBootstrap = o;
        var p = function(e, cj, ck, cl) {
            this.$1$1 = null;
            this.$1$2 = null;
            this.$1$3 = null;
            this.$1$4 = null;
            this.set_name(e);
            this.set_commandId(cj);
            this.set_hostId(ck);
            this.set_parameters(cl)
        };
        p.__typeName = 'tab._ApiCommand';
        p.generateNextCommandId = function() {
            var e = 'cmd' + p.$0;
            p.$0++;
            return e
        };
        p.parse = function(e) {
            var cj;
            var ck = e.indexOf(String.fromCharCode(44));
            if (ck < 0) {
                cj = e;
                return new p(cj, null, null, null)
            }
            cj = e.substr(0, ck);
            var cl;
            var cm = e.substr(ck + 1);
            ck = cm.indexOf(String.fromCharCode(44));
            if (ck < 0) {
                cl = cm;
                return new p(cj, cl, null, null)
            }
            cl = cm.substr(0, ck);
            var cn;
            var co = cm.substr(ck + 1);
            ck = co.indexOf(String.fromCharCode(44));
            if (ck < 0) {
                cn = co;
                return new p(cj, cl, cn, null)
            }
            cn = co.substr(0, ck);
            var cp = co.substr(ck + 1);
            return new p(cj, cl, cn, cp)
        };
        global.tab._ApiCommand = p;
        var q = function() {};
        q.__typeName = 'tab._ApiObjectRegistry';
        q.registerCrossDomainMessageRouter = function(e) {
            return q.$3(bt).call(null, e)
        };
        q.getCrossDomainMessageRouter = function() {
            return q.$2(bt).call(null)
        };
        q.disposeCrossDomainMessageRouter = function() {
            q.$0(bt).call(null)
        };
        q.$3 = function(e) {
            return function(cj) {
                if (ss.isNullOrUndefined(q.$4)) {
                    q.$4 = {}
                }
                var ck = ss.getTypeFullName(e);
                var cl = q.$4[ck];
                q.$4[ck] = cj;
                return cl
            }
        };
        q.$1 = function(e) {
            return function() {
                if (ss.isNullOrUndefined(q.$4)) {
                    throw J.createInternalError('No types registered')
                }
                var cj = ss.getTypeFullName(e);
                var ck = q.$4[cj];
                if (ss.isNullOrUndefined(ck)) {
                    throw J.createInternalError("No creation function has been registered for interface type '" + cj + "'.")
                }
                var cl = ck();
                return cl
            }
        };
        q.$2 = function(e) {
            return function() {
                if (ss.isNullOrUndefined(q.$5)) {
                    q.$5 = {}
                }
                var cj = ss.getTypeFullName(e);
                var ck = q.$5[cj];
                if (ss.isNullOrUndefined(ck)) {
                    ck = q.$1(e).call(null);
                    q.$5[cj] = ck
                }
                return ck
            }
        };
        q.$0 = function(e) {
            return function() {
                if (ss.isNullOrUndefined(q.$5)) {
                    return null
                }
                var cj = ss.getTypeFullName(e);
                var ck = q.$5[cj];
                delete q.$5[cj];
                return ck
            }
        };
        global.tab._ApiObjectRegistry = q;
        var r = function(e, cj, ck) {
            this.$1 = null;
            this.$2 = null;
            this.$0 = null;
            this.$1 = e;
            this.$2 = cj;
            this.$0 = ck
        };
        r.__typeName = 'tab._ApiServerNotification';
        r.deserialize = function(e) {
            var cj = JSON.parse(e);
            var ck = cj['api.workbookName'];
            var cl = cj['api.worksheetName'];
            var cm = cj['api.commandData'];
            return new r(ck, cl, cm)
        };
        global.tab._ApiServerNotification = r;
        var s = function(e) {
            this.$1 = null;
            this.$0 = null;
            var cj = JSON.parse(e);
            this.$1 = cj['api.commandResult'];
            this.$0 = cj['api.commandData']
        };
        s.__typeName = 'tab._ApiServerResultParser';
        global.tab._ApiServerResultParser = s;
        var t = function() {
            this.$4 = [];
            this.$3 = {}
        };
        t.__typeName = 'tab._CollectionImpl';
        global.tab._CollectionImpl = t;
        var u = function(e, cj, ck, cl) {
            this.$1 = null;
            this.$0 = null;
            this.$3 = false;
            this.$2 = 0;
            B.verifyString(e, 'Column Field Name');
            this.$1 = e;
            this.$0 = cj;
            this.$3 = ss.coalesce(ck, false);
            this.$2 = cl
        };
        u.__typeName = 'tab._ColumnImpl';
        global.tab._ColumnImpl = u;
        var v = function(e, cj, ck) {
            this.$c = null;
            this.$j = null;
            this.$l = null;
            this.$g = null;
            this.$h = null;
            this.$i = null;
            this.$k = null;
            this.$e = false;
            this.$d = false;
            this.$f = false;
            this.$l = e;
            this.$h = cj;
            this.$g = ck;
            this.$e = false;
            this.$d = false;
            this.$f = false
        };
        v.__typeName = 'tab._CustomViewImpl';
        v._getAsync = function(e) {
            var cj = new tab._Deferred;
            cj.resolve(e.get__customViewImpl().$5());
            return cj.get_promise()
        };
        v._createNew = function(e, cj, ck, cl) {
            var cm = new v(e, ck.name, cj);
            cm.$e = ck.isPublic;
            cm.$k = ck.url;
            cm.$i = ck.owner.friendlyName;
            cm.$d = ss.isValue(cl) && ss.unbox(cl) === ck.id;
            cm.$j = ck;
            return cm
        };
        v._saveNewAsync = function(e, cj, ck) {
            var cl = new tab._Deferred;
            var cm = {};
            cm['api.customViewName'] = ck;
            var cn = v.$0('api.SaveNewCustomViewCommand', cl, function(co) {
                v._processCustomViewUpdate(e, cj, co, true);
                var cp = null;
                if (ss.isValue(e.$p())) {
                    cp = e.$p().get_item(0)
                }
                cl.resolve(cp)
            });
            cj.sendCommand(Object).call(cj, cm, cn);
            return cl.get_promise()
        };
        v._showCustomViewAsync = function(e, cj, ck) {
            var cl = new tab._Deferred;
            var cm = {};
            if (ss.isValue(ck)) {
                cm['api.customViewParam'] = ck
            }
            var cn = v.$0('api.ShowCustomViewCommand', cl, function(co) {
                var cp = e.get_activeCustomView();
                cl.resolve(cp)
            });
            cj.sendCommand(Object).call(cj, cm, cn);
            return cl.get_promise()
        };
        v._makeCurrentCustomViewDefaultAsync = function(e, cj) {
            var ck = new tab._Deferred;
            var cl = {};
            var cm = v.$0('api.MakeCurrentCustomViewDefaultCommand', ck, function(cn) {
                var co = e.get_activeCustomView();
                ck.resolve(co)
            });
            cj.sendCommand(Object).call(cj, cl, cm);
            return ck.get_promise()
        };
        v._getCustomViewsAsync = function(e, cj) {
            var ck = new tab._Deferred;
            var cl = new(ss.makeGenericType(bj, [Object]))('api.FetchCustomViewsCommand', 0, function(cm) {
                v._processCustomViews(e, cj, cm);
                ck.resolve(e.$i()._toApiCollection())
            }, function(cm, cn) {
                ck.reject(J.create('serverError', cn))
            });
            cj.sendCommand(Object).call(cj, null, cl);
            return ck.get_promise()
        };
        v._processCustomViews = function(e, cj, ck) {
            v._processCustomViewUpdate(e, cj, ck, false)
        };
        v._processCustomViewUpdate = function(e, cj, ck, cl) {
            if (cl) {
                e.$q(new tab._Collection)
            }
            e.$h(null);
            var cm = null;
            if (ss.isValue(ck.currentView)) {
                cm = ck.currentView.name
            }
            var cn = ck.defaultCustomViewId;
            if (cl && ss.isValue(ck.newView)) {
                var co = v._createNew(e, cj, ck.newView, cn);
                e.$p()._add(co.$7(), co.$5())
            }
            e.$o(e.$i());
            e.$j(new tab._Collection);
            if (ss.isValue(ck.customViews)) {
                var cp = ck.customViews;
                if (cp.length > 0) {
                    for (var cq = 0; cq < cp.length; cq++) {
                        var cr = v._createNew(e, cj, cp[cq], cn);
                        e.$i()._add(cr.$7(), cr.$5());
                        if (e.$n()._has(cr.$7())) {
                            e.$n()._remove(cr.$7())
                        } else if (cl) {
                            if (!e.$p()._has(cr.$7())) {
                                e.$p()._add(cr.$7(), cr.$5())
                            }
                        }
                        if (ss.isValue(cm) && ss.referenceEquals(cr.$7(), cm)) {
                            e.$h(cr.$5())
                        }
                    }
                }
            }
        };
        v.$0 = function(e, cj, ck) {
            var cl = function(cm, cn) {
                cj.reject(J.create('serverError', cn))
            };
            return new(ss.makeGenericType(bj, [Object]))(e, 0, ck, cl)
        };
        var w = function(e, cj, ck) {
            this.$d = null;
            this.$f = new tab._Collection;
            this.$e = new tab._Collection;
            E.call(this, e, cj, ck)
        };
        w.__typeName = 'tab._DashboardImpl';
        global.tab._DashboardImpl = w;
        var x = function(e, cj) {
            this.$3 = null;
            this.$1 = new tab._Collection;
            this.$2 = false;
            this.$0 = null;
            B.verifyString(e, 'name');
            this.$3 = e;
            this.$2 = cj
        };
        x.__typeName = 'tab._DataSourceImpl';
        x.processDataSource = function(e) {
            var cj = new x(e.name, e.isPrimary);
            var ck = ss.coalesce(e.fields, []);
            for (var cl = 0; cl < ck.length; cl++) {
                var cm = ck[cl];
                var cn = T.convertFieldRole(cm.role);
                var co = T.convertFieldAggregation(cm.aggregation);
                var cp = new bQ(cj.get_dataSource(), cm.name, cn, co);
                cj.addField(cp)
            }
            return cj
        };
        x.processDataSourcesForWorksheet = function(e) {
            var cj = new tab._Collection;
            var ck = null;
            for (var cl = 0; cl < e.dataSources.length; cl++) {
                var cm = e.dataSources[cl];
                var cn = x.processDataSource(cm);
                if (cm.isPrimary) {
                    ck = cn
                } else {
                    cj._add(cm.name, cn.get_dataSource())
                }
            }
            if (ss.isValue(ck)) {
                cj._addToFirst(ck.get_name(), ck.get_dataSource())
            }
            return cj
        };
        global.tab._DataSourceImpl = x;
        var y = function(e, cj, ck, cl) {
            this.$2 = null;
            this.$3 = null;
            this.$4 = 0;
            this.$0 = null;
            this.$1 = false;
            this.$3 = e;
            this.$4 = ck;
            this.$0 = cl;
            this.$1 = cj;
            this.$2 = (cj ? 'Summary Data Table' : 'Underlying Data Table')
        };
        y.__typeName = 'tab._DataTableImpl';
        y.processGetDataPresModel = function(e) {
            var cj = y.$1(e.dataTable);
            var ck = y.$0(e.headers);
            var cl = new y(cj, e.isSummary, cj.length, ck);
            return new bP(cl)
        };
        y.$1 = function(e) {
            var cj = [];
            for (var ck = 0; ck < e.length; ck++) {
                var cl = e[ck];
                var cm = [];
                for (var cn = 0; cn < cl.length; cn++) {
                    var co = cl[cn];
                    cm.push(L.getDataValue(co))
                }
                cj.push(cm)
            }
            return cj
        };
        y.$0 = function(e) {
            var cj = [];
            for (var ck = 0; ck < e.length; ck++) {
                var cl = e[ck];
                var cm = new u(cl.fieldName, T.convertDataType(cl.dataType), cl.isReferenced, cl.index);
                cj.push(new bK(cm))
            }
            return cj
        };
        global.tab._DataTableImpl = y;
        var z = function() {
            this.$3 = null;
            this.$5 = null;
            this.$2 = [];
            this.$4 = null;
            this.$3 = new C(ss.mkdel(this, this.then));
            this.$5 = ss.mkdel(this, this.$0);
            this.$4 = ss.mkdel(this, this.$1)
        };
        z.__typeName = 'tab._DeferredImpl';
        global.tab._DeferredImpl = z;
        var A = function() {};
        A.__typeName = 'tab._jQueryShim';
        A.isFunction = function(e) {
            return A.type(e) === 'function'
        };
        A.isArray = function(e) {
            if (ss.isValue(Array['isArray'])) {
                return Array['isArray'](e)
            }
            return A.type(e) === 'array'
        };
        A.type = function(e) {
            return (ss.isNullOrUndefined(e) ? String(e) : (A.$8[A.$d.call(e)] || 'object'))
        };
        A.trim = function(e) {
            if (ss.isValue(A.$e)) {
                return (ss.isNullOrUndefined(e) ? '' : A.$e.call(e))
            }
            return (ss.isNullOrUndefined(e) ? '' : e.toString().replace(A.$f, '').replace(A.$g, ''))
        };
        A.parseJSON = function(e) {
            if (typeof(e) !== 'string' || ss.isNullOrUndefined(e)) {
                return null
            }
            e = A.trim(e);
            if (ss.isValue(JSON) && ss.isValue(JSON['parse'])) {
                return JSON.parse(e)
            }
            if (A.$a.test(e.replace(A.$b, '@').replace(A.$c, ']').replace(A.$9, ''))) {
                return (new Function('return ' + e))()
            }
            throw new ss.Exception('Invalid JSON: ' + e)
        };
        global.tab._jQueryShim = A;
        var B = function() {};
        B.__typeName = 'tab._Param';
        B.verifyString = function(e, cj) {
            if (ss.isNullOrUndefined(e) || e.length === 0) {
                throw J.createInternalStringArgumentException(cj)
            }
        };
        B.verifyValue = function(e, cj) {
            if (ss.isNullOrUndefined(e)) {
                throw J.createInternalNullArgumentException(cj)
            }
        };
        global.tab._Param = B;
        var C = function(e) {
            this.then = null;
            this.then = e
        };
        C.__typeName = 'tab._PromiseImpl';
        global.tab._PromiseImpl = C;
        var D = function(e, cj, ck, cl) {
            this.left = 0;
            this.top = 0;
            this.width = 0;
            this.height = 0;
            this.left = e;
            this.top = cj;
            this.width = ck;
            this.height = cl
        };
        D.__typeName = 'tab._Rect';
        global.tab._Rect = D;
        var E = function(e, cj, ck) {
            this.$5 = null;
            this.$1 = 0;
            this.$2 = false;
            this.$3 = false;
            this.$7 = null;
            this.$8 = null;
            this.$9 = null;
            this.$a = null;
            this.$4 = null;
            this.$6 = null;
            this.$b = 0;
            B.verifyValue(e, 'sheetInfoImpl');
            B.verifyValue(cj, 'workbookImpl');
            B.verifyValue(ck, 'messagingOptions');
            this.$5 = e.name;
            this.$1 = e.index;
            this.$2 = e.isActive;
            this.$3 = e.isHidden;
            this.$7 = e.sheetType;
            this.$8 = e.size;
            this.$9 = e.url;
            this.$a = cj;
            this.$4 = ck;
            this.$b = e.zoneId
        };
        E.__typeName = 'tab._SheetImpl';
        E.$0 = function(e) {
            if (ss.isValue(e)) {
                return L.toInt(e)
            }
            return e
        };
        E.$1 = function(e) {
            var cj = n.$1(be).call(null, e.behavior, 'size.behavior');
            var ck = e.minSize;
            if (ss.isValue(ck)) {
                ck = bz.$ctor(E.$0(e.minSize.width), E.$0(e.minSize.height))
            }
            var cl = e.maxSize;
            if (ss.isValue(cl)) {
                cl = bz.$ctor(E.$0(e.maxSize.width), E.$0(e.maxSize.height))
            }
            return bx.$ctor(cj, ck, cl)
        };
        global.tab._SheetImpl = E;
        var F = function() {};
        F.__typeName = 'tab._SheetInfoImpl';
        F.$ctor = function(e, cj, ck, cl, cm, cn, co, cp, cq) {
            var cr = new Object;
            cr.name = null;
            cr.index = 0;
            cr.workbook = null;
            cr.url = null;
            cr.isHidden = false;
            cr.sheetType = null;
            cr.zoneId = 0;
            cr.size = null;
            cr.isActive = false;
            cr.name = e;
            cr.sheetType = cj;
            cr.index = ck;
            cr.size = cl;
            cr.workbook = cm;
            cr.url = cn;
            cr.isActive = co;
            cr.isHidden = cp;
            cr.zoneId = cq;
            return cr
        };
        F.isInstanceOfType = function() {
            return true
        };
        global.tab._SheetInfoImpl = F;
        var G = function(e, cj, ck, cl, cm) {
            this.$g = null;
            this.$h = null;
            this.$i = null;
            this.$j = null;
            this.$2$1 = null;
            E.call(this, e, cj, ck);
            B.verifyValue(cl, 'storyPm');
            B.verifyValue(cm, 'findSheetFunc');
            this.$h = cm;
            this.update(cl)
        };
        G.__typeName = 'tab._StoryImpl';
        global.tab._StoryImpl = G;
        var H = function(e, cj) {
            this.$1 = null;
            this.$3 = 0;
            this.$4 = false;
            this.$5 = false;
            this.$2 = null;
            this.$6 = null;
            this.$7 = null;
            this.$8 = 0;
            this.$4 = e.isActive;
            this.$5 = e.isUpdated;
            this.$1 = e.caption;
            this.$3 = e.index;
            this.$6 = e.parentStoryImpl;
            this.$8 = e.storyPointId;
            this.$2 = cj;
            if (ss.isValue(cj)) {
                this.$2.set_parentStoryPointImpl(this);
                if (cj.get_sheetType() === 'dashboard') {
                    var ck = this.$2;
                    for (var cl = 0; cl < ck.get_worksheets().get__length(); cl++) {
                        var cm = ck.get_worksheets().get_item(cl);
                        cm._impl.set_parentStoryPointImpl(this)
                    }
                }
            }
        };
        H.__typeName = 'tab._StoryPointImpl';
        H.createContainedSheet = function(e, cj, ck, cl) {
            var cm = T.convertSheetType(e.sheetType);
            var cn = -1;
            var co = by.createAutomatic();
            var cp = false;
            var cq = cl(e.name);
            var cr = ss.isNullOrUndefined(cq);
            var cs = (cr ? '' : cq.getUrl());
            var ct = F.$ctor(e.name, cm, cn, co, cj.get_workbook(), cs, cp, cr, e.zoneId);
            if (e.sheetType === 'worksheet') {
                var cu = null;
                var cv = new P(ct, cj, ck, cu);
                return cv
            } else if (e.sheetType === 'dashboard') {
                var cw = new w(ct, cj, ck);
                var cx = O.$0(e.dashboardZones);
                cw.$c(cx, cl);
                return cw
            } else if (e.sheetType === 'story') {
                throw J.createInternalError('Cannot have a story embedded within another story.')
            } else {
                throw J.createInternalError("Unknown sheet type '" + e.sheetType + "'")
            }
        };
        global.tab._StoryPointImpl = H;
        var I = function() {};
        I.__typeName = 'tab._StoryPointInfoImpl';
        I.$ctor = function(e, cj, ck, cl, cm, cn) {
            var co = new Object;
            co.storyPointId = 0;
            co.parentStoryImpl = null;
            co.caption = null;
            co.index = 0;
            co.isActive = false;
            co.isUpdated = false;
            co.caption = e;
            co.index = cj;
            co.storyPointId = ck;
            co.isActive = cl;
            co.isUpdated = cm;
            co.parentStoryImpl = cn;
            return co
        };
        I.isInstanceOfType = function() {
            return true
        };
        global.tab._StoryPointInfoImpl = I;
        var J = function() {};
        J.__typeName = 'tab._TableauException';
        J.create = function(e, cj) {
            var ck = new ss.Exception(cj);
            ck['tableauSoftwareErrorCode'] = e;
            return ck
        };
        J.createInternalError = function(e) {
            if (ss.isValue(e)) {
                return J.create('internalError', 'Internal error. Please contact Tableau support with the following information: ' + e)
            } else {
                return J.create('internalError', 'Internal error. Please contact Tableau support')
            }
        };
        J.createInternalNullArgumentException = function(e) {
            return J.createInternalError("Null/undefined argument '" + e + "'.")
        };
        J.createInternalStringArgumentException = function(e) {
            return J.createInternalError("Invalid string argument '" + e + "'.")
        };
        J.createServerError = function(e) {
            return J.create('serverError', e)
        };
        J.createNotActiveSheet = function() {
            return J.create('notActiveSheet', 'Operation not allowed on non-active sheet')
        };
        J.createInvalidCustomViewName = function(e) {
            return J.create('invalidCustomViewName', 'Invalid custom view name: ' + e)
        };
        J.createInvalidParameter = function(e) {
            return J.create('invalidParameter', 'Invalid parameter: ' + e)
        };
        J.createInvalidFilterFieldNameOrValue = function(e) {
            return J.create('invalidFilterFieldNameOrValue', 'Invalid filter field name or value: ' + e)
        };
        J.createInvalidDateParameter = function(e) {
            return J.create('invalidDateParameter', 'Invalid date parameter: ' + e)
        };
        J.createNullOrEmptyParameter = function(e) {
            return J.create('nullOrEmptyParameter', 'Parameter cannot be null or empty: ' + e)
        };
        J.createMissingMaxSize = function() {
            return J.create('missingMaxSize', 'Missing maxSize for SheetSizeBehavior.ATMOST')
        };
        J.createMissingMinSize = function() {
            return J.create('missingMinSize', 'Missing minSize for SheetSizeBehavior.ATLEAST')
        };
        J.createMissingMinMaxSize = function() {
            return J.create('missingMinMaxSize', 'Missing minSize or maxSize for SheetSizeBehavior.RANGE')
        };
        J.createInvalidRangeSize = function() {
            return J.create('invalidSize', 'Missing minSize or maxSize for SheetSizeBehavior.RANGE')
        };
        J.createInvalidSizeValue = function() {
            return J.create('invalidSize', 'Size value cannot be less than zero')
        };
        J.createInvalidSheetSizeParam = function() {
            return J.create('invalidSize', 'Invalid sheet size parameter')
        };
        J.createSizeConflictForExactly = function() {
            return J.create('invalidSize', 'Conflicting size values for SheetSizeBehavior.EXACTLY')
        };
        J.createInvalidSizeBehaviorOnWorksheet = function() {
            return J.create('invalidSizeBehaviorOnWorksheet', 'Only SheetSizeBehavior.AUTOMATIC is allowed on Worksheets')
        };
        J.createNoUrlForHiddenWorksheet = function() {
            return J.create('noUrlForHiddenWorksheet', 'Hidden worksheets do not have a URL.')
        };
        J.$0 = function(e) {
            return J.create('invalidAggregationFieldName', "Invalid aggregation type for field '" + e + "'")
        };
        J.$1 = function(e) {
            return J.create('invalidToolbarButtonName', "Invalid toolbar button name: '" + e + "'")
        };
        J.createIndexOutOfRange = function(e) {
            return J.create('indexOutOfRange', "Index '" + e + "' is out of range.")
        };
        J.createUnsupportedEventName = function(e) {
            return J.create('unsupportedEventName', "Unsupported event '" + e + "'.")
        };
        J.createBrowserNotCapable = function() {
            return J.create('browserNotCapable', 'This browser is incapable of supporting the Tableau JavaScript API.')
        };
        global.tab._TableauException = J;
        var K = function(e, cj) {
            this.$0 = null;
            this.$2 = null;
            this.$1 = null;
            this.$2 = e;
            this.$1 = cj
        };
        K.__typeName = 'tab._ToolbarStateImpl';
        global.tab._ToolbarStateImpl = K;
        var L = function() {};
        L.__typeName = 'tab._Utility';
        L.isNullOrEmpty = function(e) {
            return ss.isNullOrUndefined(e) || (e['length'] || 0) <= 0
        };
        L.isString = function(e) {
            return typeof(e) === 'string'
        };
        L.isNumber = function(e) {
            return typeof(e) === 'number'
        };
        L.isDate = function(e) {
            if (typeof(e) === 'object' && ss.isInstanceOfType(e, ss.JsDate)) {
                return true
            } else if (Object.prototype.toString.call(e) !== '[object Date]') {
                return false
            }
            return !isNaN(e.getTime())
        };
        L.isDateValid = function(e) {
            return !isNaN(e.getTime())
        };
        L.indexOf = function(e, cj, ck) {
            if (ss.isValue(Array.prototype['indexOf'])) {
                return e['indexOf'](cj, ck)
            }
            ck = ck || 0;
            var cl = e.length;
            if (cl > 0) {
                for (var cm = ck; cm < cl; cm++) {
                    if (ss.referenceEquals(e[cm], cj)) {
                        return cm
                    }
                }
            }
            return -1
        };
        L.contains = function(e, cj, ck) {
            var cl = L.indexOf(e, cj, ck);
            return cl >= 0
        };
        L.getTopmostWindow = function() {
            var e = window.self;
            while (ss.isValue(e.parent) && !ss.referenceEquals(e.parent, e)) {
                e = e.parent
            }
            return e
        };
        L.toInt = function(e) {
            if (L.isNumber(e)) {
                return ss.Int32.trunc(e)
            }
            var cj = parseInt(e.toString(), 10);
            if (isNaN(cj)) {
                return 0
            }
            return cj
        };
        L.hasClass = function(e, cj) {
            var ck = new RegExp('[\\n\\t\\r]', 'g');
            return ss.isValue(e) && (' ' + e.className + ' ').replace(ck, ' ').indexOf(' ' + cj + ' ') > -1
        };
        L.findParentWithClassName = function(e, cj, ck) {
            var cl = (ss.isValue(e) ? e.parentNode : null);
            ck = ck || document.body;
            while (ss.isValue(cl)) {
                if (L.hasClass(cl, cj)) {
                    return cl
                }
                if (ss.referenceEquals(cl, ck)) {
                    cl = null
                } else {
                    cl = cl.parentNode
                }
            }
            return cl
        };
        L.hasJsonParse = function() {
            return ss.isValue(JSON) && ss.isValue(JSON.parse)
        };
        L.hasWindowPostMessage = function() {
            return ss.isValue(window.postMessage)
        };
        L.isPostMessageSynchronous = function() {
            if (L.isIE()) {
                var e = new RegExp('(msie) ([\\w.]+)');
                var cj = e.exec(window.navigator.userAgent.toLowerCase());
                var ck = cj[2] || '0';
                var cl = parseInt(ck, 10);
                return cl <= 8
            }
            return false
        };
        L.hasDocumentAttachEvent = function() {
            return ss.isValue(document.attachEvent)
        };
        L.hasWindowAddEventListener = function() {
            return ss.isValue(window.addEventListener)
        };
        L.isElementOfTag = function(e, cj) {
            return ss.isValue(e) && e.nodeType === 1 && ss.referenceEquals(e.tagName.toLowerCase(), cj.toLowerCase())
        };
        L.elementToString = function(e) {
            var cj = new ss.StringBuilder;
            cj.append(e.tagName.toLowerCase());
            if (!L.isNullOrEmpty(e.id)) {
                cj.append('#').append(e.id)
            }
            if (!L.isNullOrEmpty(e.className)) {
                var ck = e.className.split(' ');
                cj.append('.').append(ck.join('.'))
            }
            return cj.toString()
        };
        L.tableauGCS = function(e) {
            if (typeof(window['getComputedStyle']) === 'function') {
                return window.getComputedStyle(e)
            } else {
                return e['currentStyle']
            }
        };
        L.isIE = function() {
            return window.navigator.userAgent.indexOf('MSIE') > -1 && ss.isNullOrUndefined(window.opera)
        };
        L.isSafari = function() {
            var e = window.navigator.userAgent;
            var cj = e.indexOf('Chrome') >= 0;
            return e.indexOf('Safari') >= 0 && !cj
        };
        L.mobileDetect = function() {
            var e = window.navigator.userAgent;
            if (e.indexOf('iPad') !== -1) {
                return true
            }
            if (e.indexOf('Android') !== -1) {
                return true
            }
            if (e.indexOf('AppleWebKit') !== -1 && e.indexOf('Mobile') !== -1) {
                return true
            }
            return false
        };
        L.visibleContentRectInDocumentCoordinates = function(e) {
            var cj = L.contentRectInDocumentCoordinates(e);
            for (var ck = e.parentElement; ss.isValue(ck) && ss.isValue(ck.parentElement); ck = ck.parentElement) {
                var cl = L.$0(ck).overflow;
                if (cl === 'auto' || cl === 'scroll' || cl === 'hidden') {
                    cj = cj.intersect(L.contentRectInDocumentCoordinates(ck))
                }
            }
            var cm = L.contentRectInDocumentCoordinates(document.documentElement);
            var cn = new tab.WindowHelper(window.self);
            if (cn.isQuirksMode()) {
                cm.height = document.body.clientHeight - cm.left;
                cm.width = document.body.clientWidth - cm.top
            }
            cm.left += cn.get_pageXOffset();
            cm.top += cn.get_pageYOffset();
            return cj.intersect(cm)
        };
        L.contentRectInDocumentCoordinates = function(e) {
            var cj = L.getBoundingClientRect(e);
            var ck = L.$0(e);
            var cl = L.toInt(ck.paddingLeft);
            var cm = L.toInt(ck.paddingTop);
            var cn = L.toInt(ck.borderLeftWidth);
            var co = L.toInt(ck.borderTopWidth);
            var cp = L.computeContentSize(e);
            var cq = new tab.WindowHelper(window.self);
            var cr = cj.left + cl + cn + cq.get_pageXOffset();
            var cs = cj.top + cm + co + cq.get_pageYOffset();
            return new D(cr, cs, cp.width, cp.height)
        };
        L.getBoundingClientRect = function(e) {
            var cj = e.getBoundingClientRect();
            var ck = ss.Int32.trunc(cj.top);
            var cl = ss.Int32.trunc(cj.left);
            var cm = ss.Int32.trunc(cj.right);
            var cn = ss.Int32.trunc(cj.bottom);
            return new D(cl, ck, cm - cl, cn - ck)
        };
        L.convertRawValue = function(e, cj) {
            if (ss.isNullOrUndefined(e)) {
                return null
            }
            switch (cj) {
                case 'bool':
                    {
                        return e
                    }
                case 'date':
                case 'number':
                    {
                        if (ss.isNullOrUndefined(e)) {
                            return Number.NaN
                        }
                        return e
                    }
                default:
                case 'string':
                    {
                        return e
                    }
            }
        };
        L.getDataValue = function(e) {
            if (ss.isNullOrUndefined(e)) {
                return bn.$ctor(null, null, null)
            }
            return bn.$ctor(L.convertRawValue(e.value, e.type), e.formattedValue, e.aliasedValue)
        };
        L.serializeDateForServer = function(e) {
            var cj = '';
            if (ss.isValue(e) && L.isDate(e)) {
                var ck = e.getUTCFullYear();
                var cl = e.getUTCMonth() + 1;
                var cm = e.getUTCDate();
                var cn = e.getUTCHours();
                var co = e.getUTCMinutes();
                var cp = e.getUTCSeconds();
                cj = ck + '-' + cl + '-' + cm + ' ' + cn + ':' + co + ':' + cp
            }
            return cj
        };
        L.computeContentSize = function(e) {
            var cj = L.$0(e);
            var ck = parseFloat(cj.paddingLeft);
            var cl = parseFloat(cj.paddingTop);
            var cm = parseFloat(cj.paddingRight);
            var cn = parseFloat(cj.paddingBottom);
            var co = e.clientWidth - Math.round(ck + cm);
            var cp = e.clientHeight - Math.round(cl + cn);
            return bz.$ctor(co, cp)
        };
        L.$0 = function(e) {
            if (typeof(window['getComputedStyle']) === 'function') {
                if (ss.isValue(e.ownerDocument.defaultView.opener)) {
                    return e.ownerDocument.defaultView.getComputedStyle(e)
                }
                return window.getComputedStyle(e)
            } else if (ss.isValue(e['currentStyle'])) {
                return e['currentStyle']
            }
            return e.style
        };
        L.roundVizSizeInPixels = function(e) {
            if (ss.isNullOrUndefined(e) || !(e.indexOf('px') !== -1)) {
                return e
            }
            var cj = parseFloat(e.split('px')[0]);
            return Math.round(cj) + 'px'
        };
        L.noResultPromiseHelper = function(e, cj, ck) {
            var cl = new tab._Deferred;
            var cm = new(ss.makeGenericType(bj, [Object]))(e, 1, function(cn) {
                cl.resolve()
            }, function(cn, co) {
                cl.reject(J.createServerError(co))
            });
            ck.sendCommand(Object).call(ck, cj, cm);
            return cl.get_promise()
        };
        global.tab._Utility = L;
        var M = function() {};
        M.__typeName = 'tab._VizManagerImpl';
        M.$4 = function() {
            return M.$5.concat()
        };
        M.$0 = function(e) {
            M.$3(e);
            M.$5.push(e)
        };
        M.$2 = function(e) {
            for (var cj = 0, ck = M.$5.length; cj < ck; cj++) {
                if (ss.referenceEquals(M.$5[cj], e)) {
                    M.$5.splice(cj, 1);
                    break
                }
            }
        };
        M.$1 = function() {
            for (var e = 0, cj = M.$5.length; e < cj; e++) {
                M.$5[e]._impl.$O()
            }
        };
        M.$3 = function(e) {
            var cj = e.getParentElement();
            for (var ck = 0, cl = M.$5.length; ck < cl; ck++) {
                if (ss.referenceEquals(M.$5[ck].getParentElement(), cj)) {
                    var cm = "Another viz is already present in element '" + L.elementToString(cj) + "'.";
                    throw J.create('vizAlreadyInManager', cm)
                }
            }
        };
        var N = function(e, cj, ck) {
            this.name = '';
            this.host_url = null;
            this.tabs = false;
            this.toolbar = false;
            this.toolBarPosition = null;
            this.device = null;
            this.hostId = null;
            this.width = null;
            this.height = null;
            this.parentElement = null;
            this.userSuppliedParameters = null;
            this.staticImageUrl = null;
            this.fixedSize = false;
            this.displayStaticImage = false;
            this.$2 = null;
            this.$1 = null;
            if (ss.isNullOrUndefined(e) || ss.isNullOrUndefined(cj)) {
                throw J.create('noUrlOrParentElementNotFound', 'URL is empty or Parent element not found')
            }
            if (ss.isNullOrUndefined(ck)) {
                ck = new Object;
                ck.hideTabs = false;
                ck.hideToolbar = false;
                ck.onFirstInteractive = null
            }
            if (ss.isValue(ck.height) || ss.isValue(ck.width)) {
                this.fixedSize = true;
                if (L.isNumber(ck.height)) {
                    ck.height = ck.height.toString() + 'px'
                }
                if (L.isNumber(ck.width)) {
                    ck.width = ck.width.toString() + 'px'
                }
                this.height = (ss.isValue(ck.height) ? L.roundVizSizeInPixels(ck.height.toString()) : null);
                this.width = (ss.isValue(ck.width) ? L.roundVizSizeInPixels(ck.width.toString()) : null)
            } else {
                this.fixedSize = false
            }
            this.displayStaticImage = ck.displayStaticImage || false;
            this.staticImageUrl = ck.staticImageUrl || '';
            this.tabs = !(ck.hideTabs || false);
            this.toolbar = !(ck.hideToolbar || false);
            this.device = ck.device;
            this.parentElement = e;
            this.$1 = ck;
            this.toolBarPosition = ck.toolbarPosition;
            var cl = cj.split('?');
            this.$2 = cl[0];
            if (cl.length === 2) {
                this.userSuppliedParameters = cl[1]
            } else {
                this.userSuppliedParameters = ''
            }
            var cm = (new RegExp('.*?[^/:]/', '')).exec(this.$2);
            if (ss.isNullOrUndefined(cm) || cm[0].toLowerCase().indexOf('http://') === -1 && cm[0].toLowerCase().indexOf('https://') === -1) {
                throw J.create('invalidUrl', 'Invalid url')
            }
            this.host_url = cm[0].toLowerCase();
            this.name = this.$2.replace(cm[0], '');
            this.name = this.name.replace('views/', '')
        };
        N.__typeName = 'tab._VizParameters';
        global.tab._VizParameters = N;
        var O = function(e, cj, ck) {
            this.$E = null;
            this.$D = null;
            this.$y = null;
            this.$s = null;
            this.$r = null;
            this.$A = new tab._Collection;
            this.$v = false;
            this.$x = null;
            this.$t = null;
            this.$u = new tab._Collection;
            this.$C = new tab._Collection;
            this.$B = new tab._Collection;
            this.$z = null;
            this.$w = null;
            this.$D = e;
            this.$x = cj;
            this.$5(ck)
        };
        O.__typeName = 'tab._WorkbookImpl';
        O.$0 = function(e) {
            e = ss.coalesce(e, []);
            var cj = [];
            for (var ck = 0; ck < e.length; ck++) {
                var cl = e[ck];
                var cm = T.convertDashboardObjectType(cl.zoneType);
                var cn = bz.$ctor(cl.width, cl.height);
                var co = bw.$ctor(cl.x, cl.y);
                var cp = cl.name;
                var cq = {
                    name: cp,
                    objectType: cm,
                    position: co,
                    size: cn,
                    zoneId: cl.zoneId
                };
                cj.push(cq)
            }
            return cj
        };
        O.$2 = function(e) {
            if (ss.isNullOrUndefined(e)) {
                return null
            }
            if (L.isString(e)) {
                return e
            }
            var cj = ss.safeCast(e, bY);
            if (ss.isValue(cj)) {
                return cj.getName()
            }
            var ck = ss.safeCast(e, bZ);
            if (ss.isValue(ck)) {
                return ck.getName()
            }
            return null
        };
        O.$1 = function(e) {
            if (ss.isNullOrUndefined(e)) {
                return by.createAutomatic()
            }
            return by.fromSizeConstraints(e.sizeConstraints)
        };
        O.$4 = function(e) {
            var cj = new tab._Collection;
            for (var ck = 0; ck < e.parameters.length; ck++) {
                var cl = e.parameters[ck];
                var cm = new m(cl);
                cj._add(cm.$7(), cm.$8())
            }
            return cj
        };
        O.$3 = function(e, cj) {
            for (var ck = 0; ck < cj.parameters.length; ck++) {
                var cl = cj.parameters[ck];
                if (ss.referenceEquals(cl.name, e)) {
                    return new m(cl)
                }
            }
            return null
        };
        global.tab._WorkbookImpl = O;
        var P = function(e, cj, ck, cl) {
            this.$K = null;
            this.$I = null;
            this.$H = new tab._Collection;
            this.$J = new tab._Collection;
            this.highlightedMarks = null;
            E.call(this, e, cj, ck);
            this.$I = cl
        };
        P.__typeName = 'tab._WorksheetImpl';
        P.$2 = function(e) {
            var cj = e;
            if (ss.isValue(cj) && ss.isValue(cj.errorCode)) {
                var ck = (ss.isValue(cj.additionalInformation) ? cj.additionalInformation.toString() : '');
                switch (cj.errorCode) {
                    case 'invalidFilterFieldName':
                        {
                            return J.create('invalidFilterFieldName', ck)
                        }
                    case 'invalidFilterFieldValue':
                        {
                            return J.create('invalidFilterFieldValue', ck)
                        }
                    case 'invalidAggregationFieldName':
                        {
                            return J.$0(ck)
                        }
                    default:
                        {
                            return J.createServerError(ck)
                        }
                }
            }
            return null
        };
        P.$3 = function(e) {
            if (ss.isNullOrUndefined(e)) {
                throw J.createNullOrEmptyParameter('filterOptions')
            }
            if (ss.isNullOrUndefined(e.min) && ss.isNullOrUndefined(e.max)) {
                throw J.create('invalidParameter', 'At least one of filterOptions.min or filterOptions.max must be specified.')
            }
            var cj = new Object;
            if (ss.isValue(e.min)) {
                cj.min = e.min
            }
            if (ss.isValue(e.max)) {
                cj.max = e.max
            }
            if (ss.isValue(e.nullOption)) {
                cj.nullOption = n.$1(Z).call(null, e.nullOption, 'filterOptions.nullOption')
            }
            return cj
        };
        P.$4 = function(e) {
            if (ss.isNullOrUndefined(e)) {
                throw J.createNullOrEmptyParameter('filterOptions')
            }
            var cj = new Object;
            cj.rangeType = n.$1(R).call(null, e.rangeType, 'filterOptions.rangeType');
            cj.periodType = n.$1(bc).call(null, e.periodType, 'filterOptions.periodType');
            if (cj.rangeType === 'lastn' || cj.rangeType === 'nextn') {
                if (ss.isNullOrUndefined(e.rangeN)) {
                    throw J.create('missingRangeNForRelativeDateFilters', 'Missing rangeN field for a relative date filter of LASTN or NEXTN.')
                }
                cj.rangeN = L.toInt(e.rangeN)
            }
            if (ss.isValue(e.anchorDate)) {
                if (!L.isDate(e.anchorDate) || !L.isDateValid(e.anchorDate)) {
                    throw J.createInvalidDateParameter('filterOptions.anchorDate')
                }
                cj.anchorDate = e.anchorDate
            }
            return cj
        };
        P.$0 = function(e, cj, ck) {
            return new(ss.makeGenericType(bj, [Object]))(e, 1, function(cl) {
                var cm = P.$2(cl);
                if (ss.isNullOrUndefined(cm)) {
                    ck.resolve(cj)
                } else {
                    ck.reject(cm)
                }
            }, function(cl, cm) {
                if (cl) {
                    ck.reject(J.createInvalidFilterFieldNameOrValue(cj))
                } else {
                    var cn = J.create('filterCannotBePerformed', cm);
                    ck.reject(cn)
                }
            })
        };
        P.$1 = function(e) {
            var cj = e;
            if (ss.isValue(cj) && ss.isValue(cj.errorCode)) {
                var ck = (ss.isValue(cj.additionalInformation) ? cj.additionalInformation.toString() : '');
                switch (cj.errorCode) {
                    case 'invalidSelectionFieldName':
                        {
                            return J.create('invalidSelectionFieldName', ck)
                        }
                    case 'invalidSelectionValue':
                        {
                            return J.create('invalidSelectionValue', ck)
                        }
                    case 'invalidSelectionDate':
                        {
                            return J.create('invalidSelectionDate', ck)
                        }
                }
            }
            return null
        };
        global.tab._WorksheetImpl = P;
        var Q = function() {};
        Q.__typeName = 'tab.ApiDashboardObjectType';
        global.tab.ApiDashboardObjectType = Q;
        var R = function() {};
        R.__typeName = 'tab.ApiDateRangeType';
        global.tab.ApiDateRangeType = R;
        var S = function() {};
        S.__typeName = 'tab.ApiDeviceType';
        global.tab.ApiDeviceType = S;
        var T = function() {};
        T.__typeName = 'tab.ApiEnumConverter';
        T.convertDashboardObjectType = function(e) {
            switch (e) {
                case 'blank':
                    {
                        return 'blank'
                    }
                case 'image':
                    {
                        return 'image'
                    }
                case 'legend':
                    {
                        return 'legend'
                    }
                case 'pageFilter':
                    {
                        return 'pageFilter'
                    }
                case 'parameterControl':
                    {
                        return 'parameterControl'
                    }
                case 'quickFilter':
                    {
                        return 'quickFilter'
                    }
                case 'text':
                    {
                        return 'text'
                    }
                case 'title':
                    {
                        return 'title'
                    }
                case 'webPage':
                    {
                        return 'webPage'
                    }
                case 'worksheet':
                    {
                        return 'worksheet'
                    }
                default:
                    {
                        throw J.createInternalError('Unknown ApiCrossDomainDashboardObjectType: ' + e)
                    }
            }
        };
        T.convertDateRange = function(e) {
            switch (e) {
                case 'curr':
                    {
                        return 'curr'
                    }
                case 'last':
                    {
                        return 'last'
                    }
                case 'lastn':
                    {
                        return 'lastn'
                    }
                case 'next':
                    {
                        return 'next'
                    }
                case 'nextn':
                    {
                        return 'nextn'
                    }
                case 'todate':
                    {
                        return 'todate'
                    }
                default:
                    {
                        throw J.createInternalError('Unknown ApiCrossDomainDateRangeType: ' + e)
                    }
            }
        };
        T.convertFieldAggregation = function(e) {
            switch (e) {
                case 'ATTR':
                    {
                        return 'ATTR'
                    }
                case 'AVG':
                    {
                        return 'AVG'
                    }
                case 'COUNT':
                    {
                        return 'COUNT'
                    }
                case 'COUNTD':
                    {
                        return 'COUNTD'
                    }
                case 'DAY':
                    {
                        return 'DAY'
                    }
                case 'END':
                    {
                        return 'END'
                    }
                case 'HOUR':
                    {
                        return 'HOUR'
                    }
                case 'INOUT':
                    {
                        return 'INOUT'
                    }
                case 'KURTOSIS':
                    {
                        return 'KURTOSIS'
                    }
                case 'MAX':
                    {
                        return 'MAX'
                    }
                case 'MDY':
                    {
                        return 'MDY'
                    }
                case 'MEDIAN':
                    {
                        return 'MEDIAN'
                    }
                case 'MIN':
                    {
                        return 'MIN'
                    }
                case 'MINUTE':
                    {
                        return 'MINUTE'
                    }
                case 'MONTH':
                    {
                        return 'MONTH'
                    }
                case 'MONTHYEAR':
                    {
                        return 'MONTHYEAR'
                    }
                case 'NONE':
                    {
                        return 'NONE'
                    }
                case 'PERCENTILE':
                    {
                        return 'PERCENTILE'
                    }
                case 'QUART1':
                    {
                        return 'QUART1'
                    }
                case 'QUART3':
                    {
                        return 'QUART3'
                    }
                case 'QTR':
                    {
                        return 'QTR'
                    }
                case 'SECOND':
                    {
                        return 'SECOND'
                    }
                case 'SKEWNESS':
                    {
                        return 'SKEWNESS'
                    }
                case 'STDEV':
                    {
                        return 'STDEV'
                    }
                case 'STDEVP':
                    {
                        return 'STDEVP'
                    }
                case 'SUM':
                    {
                        return 'SUM'
                    }
                case 'SUM_XSQR':
                    {
                        return 'SUM_XSQR'
                    }
                case 'TRUNC_DAY':
                    {
                        return 'TRUNC_DAY'
                    }
                case 'TRUNC_HOUR':
                    {
                        return 'TRUNC_HOUR'
                    }
                case 'TRUNC_MINUTE':
                    {
                        return 'TRUNC_MINUTE'
                    }
                case 'TRUNC_MONTH':
                    {
                        return 'TRUNC_MONTH'
                    }
                case 'TRUNC_QTR':
                    {
                        return 'TRUNC_QTR'
                    }
                case 'TRUNC_SECOND':
                    {
                        return 'TRUNC_SECOND'
                    }
                case 'TRUNC_WEEK':
                    {
                        return 'TRUNC_WEEK'
                    }
                case 'TRUNC_YEAR':
                    {
                        return 'TRUNC_YEAR'
                    }
                case 'USER':
                    {
                        return 'USER'
                    }
                case 'VAR':
                    {
                        return 'VAR'
                    }
                case 'VARP':
                    {
                        return 'VARP'
                    }
                case 'WEEK':
                    {
                        return 'WEEK'
                    }
                case 'WEEKDAY':
                    {
                        return 'WEEKDAY'
                    }
                case 'YEAR':
                    {
                        return 'YEAR'
                    }
                default:
                    {
                        throw J.createInternalError('Unknown ApiCrossDomainFieldAggregationType: ' + e)
                    }
            }
        };
        T.convertFieldRole = function(e) {
            switch (e) {
                case 'dimension':
                    {
                        return 'dimension'
                    }
                case 'measure':
                    {
                        return 'measure'
                    }
                case 'unknown':
                    {
                        return 'unknown'
                    }
                default:
                    {
                        throw J.createInternalError('Unknown ApiCrossDomainFieldRoleType: ' + e)
                    }
            }
        };
        T.convertFilterType = function(e) {
            switch (e) {
                case 'categorical':
                    {
                        return 'categorical'
                    }
                case 'hierarchical':
                    {
                        return 'hierarchical'
                    }
                case 'quantitative':
                    {
                        return 'quantitative'
                    }
                case 'relativedate':
                    {
                        return 'relativedate'
                    }
                default:
                    {
                        throw J.createInternalError('Unknown ApiCrossDomainFilterType: ' + e)
                    }
            }
        };
        T.convertParameterAllowableValuesType = function(e) {
            switch (e) {
                case 'all':
                    {
                        return 'all'
                    }
                case 'list':
                    {
                        return 'list'
                    }
                case 'range':
                    {
                        return 'range'
                    }
                default:
                    {
                        throw J.createInternalError('Unknown ApiCrossDomainParameterAllowableValuesType: ' + e)
                    }
            }
        };
        T.convertParameterDataType = function(e) {
            switch (e) {
                case 'boolean':
                    {
                        return 'boolean'
                    }
                case 'date':
                    {
                        return 'date'
                    }
                case 'datetime':
                    {
                        return 'datetime'
                    }
                case 'float':
                    {
                        return 'float'
                    }
                case 'integer':
                    {
                        return 'integer'
                    }
                case 'string':
                    {
                        return 'string'
                    }
                default:
                    {
                        throw J.createInternalError('Unknown ApiCrossDomainParameterDataType: ' + e)
                    }
            }
        };
        T.convertPeriodType = function(e) {
            switch (e) {
                case 'year':
                    {
                        return 'year'
                    }
                case 'quarter':
                    {
                        return 'quarter'
                    }
                case 'month':
                    {
                        return 'month'
                    }
                case 'week':
                    {
                        return 'week'
                    }
                case 'day':
                    {
                        return 'day'
                    }
                case 'hour':
                    {
                        return 'hour'
                    }
                case 'minute':
                    {
                        return 'minute'
                    }
                case 'second':
                    {
                        return 'second'
                    }
                default:
                    {
                        throw J.createInternalError('Unknown ApiCrossDomainPeriodType: ' + e)
                    }
            }
        };
        T.convertSheetType = function(e) {
            switch (e) {
                case 'worksheet':
                    {
                        return 'worksheet'
                    }
                case 'dashboard':
                    {
                        return 'dashboard'
                    }
                case 'story':
                    {
                        return 'story'
                    }
                default:
                    {
                        throw J.createInternalError('Unknown ApiCrossDomainSheetType: ' + e)
                    }
            }
        };
        T.convertDataType = function(e) {
            switch (e) {
                case 'boolean':
                    {
                        return 'boolean'
                    }
                case 'date':
                    {
                        return 'date'
                    }
                case 'datetime':
                    {
                        return 'datetime'
                    }
                case 'float':
                    {
                        return 'float'
                    }
                case 'integer':
                    {
                        return 'integer'
                    }
                case 'string':
                    {
                        return 'string'
                    }
                default:
                    {
                        throw J.createInternalError('Unknown ApiCrossDomainParameterDataType: ' + e)
                    }
            }
        };
        global.tab.ApiEnumConverter = T;
        var U = function() {};
        U.__typeName = 'tab.ApiErrorCode';
        global.tab.ApiErrorCode = U;
        var V = function() {};
        V.__typeName = 'tab.ApiFieldAggregationType';
        global.tab.ApiFieldAggregationType = V;
        var W = function() {};
        W.__typeName = 'tab.ApiFieldRoleType';
        global.tab.ApiFieldRoleType = W;
        var X = function() {};
        X.__typeName = 'tab.ApiFilterType';
        global.tab.ApiFilterType = X;
        var Y = function() {};
        Y.__typeName = 'tab.ApiFilterUpdateType';
        global.tab.ApiFilterUpdateType = Y;
        var Z = function() {};
        Z.__typeName = 'tab.ApiNullOption';
        global.tab.ApiNullOption = Z;
        var ba = function() {};
        ba.__typeName = 'tab.ApiParameterAllowableValuesType';
        global.tab.ApiParameterAllowableValuesType = ba;
        var bb = function() {};
        bb.__typeName = 'tab.ApiParameterDataType';
        global.tab.ApiParameterDataType = bb;
        var bc = function() {};
        bc.__typeName = 'tab.ApiPeriodType';
        global.tab.ApiPeriodType = bc;
        var bd = function() {};
        bd.__typeName = 'tab.ApiSelectionUpdateType';
        global.tab.ApiSelectionUpdateType = bd;
        var be = function() {};
        be.__typeName = 'tab.ApiSheetSizeBehavior';
        global.tab.ApiSheetSizeBehavior = be;
        var bf = function() {};
        bf.__typeName = 'tab.ApiSheetType';
        global.tab.ApiSheetType = bf;
        var bg = function() {};
        bg.__typeName = 'tab.ApiTableauEventName';
        global.tab.ApiTableauEventName = bg;
        var bh = function() {};
        bh.__typeName = 'tab.ApiToolbarButtonName';
        global.tab.ApiToolbarButtonName = bh;
        var bi = function() {};
        bi.__typeName = 'tab.ApiToolbarPosition';
        global.tab.ApiToolbarPosition = bi;
        var bj = function(e) {
            var cj = function(ck, cl, cm, cn) {
                this.$0 = null;
                this.$3 = 0;
                this.$2 = null;
                this.$1 = null;
                this.$0 = ck;
                this.$2 = cm;
                this.$3 = cl;
                this.$1 = cn
            };
            ss.registerGenericClassInstance(cj, bj, [e], {
                get_commandName: function() {
                    return this.$0
                },
                get_successCallback: function() {
                    return this.$2
                },
                get_successCallbackTiming: function() {
                    return this.$3
                },
                get_errorCallback: function() {
                    return this.$1
                }
            }, function() {
                return null
            }, function() {
                return []
            });
            return cj
        };
        bj.__typeName = 'tab.CommandReturnHandler$1';
        ss.initGenericClass(bj, a, 1);
        global.tab.CommandReturnHandler$1 = bj;
        var bk = function(e, cj) {
            this.$1 = null;
            this.$0 = null;
            B.verifyValue(e, 'router');
            B.verifyValue(cj, 'handler');
            this.$1 = e;
            this.$0 = cj
        };
        bk.__typeName = 'tab.CrossDomainMessagingOptions';
        global.tab.CrossDomainMessagingOptions = bk;
        var bl = function(e, cj, ck) {
            this.$2 = null;
            bC.call(this, e, cj);
            this.$2 = new g(cj._impl.get__workbookImpl(), ck)
        };
        bl.__typeName = 'tab.CustomViewEvent';
        global.tab.CustomViewEvent = bl;
        var bm = function() {};
        bm.__typeName = 'tab.DataType';
        global.tab.DataType = bm;
        var bn = function() {};
        bn.__typeName = 'tab.DataValue';
        bn.$ctor = function(e, cj, ck) {
            var cl = new Object;
            cl.value = null;
            cl.formattedValue = null;
            cl.value = e;
            if (L.isNullOrEmpty(ck)) {
                cl.formattedValue = cj
            } else {
                cl.formattedValue = ck
            }
            return cl
        };
        bn.isInstanceOfType = function() {
            return true
        };
        global.tab.DataValue = bn;
        var bo = function(e, cj) {
            this.$0 = null;
            this.$1 = null;
            this.$0 = e;
            this.$1 = cj
        };
        bo.__typeName = 'tab.EventContext';
        global.tab.EventContext = bo;
        var bp = function(e, cj, ck, cl, cm) {
            this.$4 = null;
            this.$3 = null;
            bI.call(this, e, cj, ck);
            this.$4 = cm;
            this.$3 = new h(cj._impl.get__workbookImpl(), ck, cl, cm)
        };
        bp.__typeName = 'tab.FilterEvent';
        global.tab.FilterEvent = bp;
        var bq = function(e, cj, ck) {
            this.$2 = null;
            bC.call(this, e, cj);
            this.$2 = ck
        };
        bq.__typeName = 'tab.FirstVizSizeKnownEvent';
        global.tab.FirstVizSizeKnownEvent = bq;
        var br = function(e, cj, ck) {
            this.$3 = null;
            bI.call(this, e, cj, ck);
            this.$3 = new i(cj._impl.get__workbookImpl(), ck)
        };
        br.__typeName = 'tab.HighlightEvent';
        global.tab.HighlightEvent = br;
        var bs = function() {};
        bs.__typeName = 'tab.ICrossDomainMessageHandler';
        global.tab.ICrossDomainMessageHandler = bs;
        var bt = function() {};
        bt.__typeName = 'tab.ICrossDomainMessageRouter';
        global.tab.ICrossDomainMessageRouter = bt;
        var bu = function(e, cj, ck) {
            this.$3 = null;
            bI.call(this, e, cj, ck);
            this.$3 = new d(cj._impl.get__workbookImpl(), ck)
        };
        bu.__typeName = 'tab.MarksEvent';
        global.tab.MarksEvent = bu;
        var bv = function(e, cj, ck) {
            this.$2 = null;
            bC.call(this, e, cj);
            this.$2 = new f(cj._impl.get__workbookImpl(), ck)
        };
        bv.__typeName = 'tab.ParameterEvent';
        global.tab.ParameterEvent = bv;
        var bw = function() {};
        bw.__typeName = 'tab.Point';
        bw.$ctor = function(e, cj) {
            var ck = new Object;
            ck.x = 0;
            ck.y = 0;
            ck.x = e;
            ck.y = cj;
            return ck
        };
        bw.isInstanceOfType = function() {
            return true
        };
        global.tab.Point = bw;
        var bx = function() {};
        bx.__typeName = 'tab.SheetSize';
        bx.$ctor = function(e, cj, ck) {
            var cl = new Object;
            cl.behavior = null;
            cl.minSize = null;
            cl.maxSize = null;
            cl.behavior = ss.coalesce(e, 'automatic');
            if (ss.isValue(cj)) {
                cl.minSize = cj
            } else {
                delete cl['minSize']
            }
            if (ss.isValue(ck)) {
                cl.maxSize = ck
            } else {
                delete cl['maxSize']
            }
            return cl
        };
        bx.isInstanceOfType = function() {
            return true
        };
        global.tab.SheetSize = bx;
        var by = function() {};
        by.__typeName = 'tab.SheetSizeFactory';
        by.createAutomatic = function() {
            var e = bx.$ctor('automatic', null, null);
            return e
        };
        by.fromSizeConstraints = function(e) {
            var cj = e.minHeight;
            var ck = e.minWidth;
            var cl = e.maxHeight;
            var cm = e.maxWidth;
            var cn = 'automatic';
            var co = null;
            var cp = null;
            if (cj === 0 && ck === 0) {
                if (cl === 0 && cm === 0) {} else {
                    cn = 'atmost';
                    cp = bz.$ctor(cm, cl)
                }
            } else if (cl === 0 && cm === 0) {
                cn = 'atleast';
                co = bz.$ctor(ck, cj)
            } else if (cl === cj && cm === ck && ck > 0) {
                cn = 'exactly';
                co = bz.$ctor(ck, cj);
                cp = bz.$ctor(ck, cj)
            } else {
                cn = 'range';
                if (ck === 0 && cm === 0) {
                    cm = 2147483647
                }
                co = bz.$ctor(ck, cj);
                cp = bz.$ctor(cm, cl)
            }
            return bx.$ctor(cn, co, cp)
        };
        global.tab.SheetSizeFactory = by;
        var bz = function() {};
        bz.__typeName = 'tab.Size';
        bz.$ctor = function(e, cj) {
            var ck = new Object;
            ck.width = 0;
            ck.height = 0;
            ck.width = e;
            ck.height = cj;
            return ck
        };
        bz.isInstanceOfType = function() {
            return true
        };
        global.tab.Size = bz;
        var bA = function() {};
        bA.__typeName = 'tab.StoryPointInfoImplUtil';
        bA.clone = function(e) {
            return I.$ctor(e.caption, e.index, e.storyPointId, e.isActive, e.isUpdated, e.parentStoryImpl)
        };
        global.tab.StoryPointInfoImplUtil = bA;
        var bB = function(e, cj, ck, cl) {
            this.$3 = null;
            this.$2 = null;
            bC.call(this, e, cj);
            this.$3 = ck;
            this.$2 = cl
        };
        bB.__typeName = 'tab.StoryPointSwitchEvent';
        global.tab.StoryPointSwitchEvent = bB;
        var bC = function(e, cj) {
            this.$1 = null;
            this.$0 = null;
            this.$1 = cj;
            this.$0 = e
        };
        bC.__typeName = 'tab.TableauEvent';
        global.tab.TableauEvent = bC;
        var bD = function(e, cj, ck, cl) {
            this.$3 = null;
            this.$2 = null;
            bC.call(this, e, cj);
            this.$3 = ck;
            this.$2 = cl
        };
        bD.__typeName = 'tab.TabSwitchEvent';
        global.tab.TabSwitchEvent = bD;
        var bE = function(e, cj, ck) {
            this.$2 = null;
            bC.call(this, e, cj);
            this.$2 = ck
        };
        bE.__typeName = 'tab.ToolbarStateEvent';
        global.tab.ToolbarStateEvent = bE;
        var bF = function(e, cj, ck, cl, cm) {
            this.$1b = null;
            this.$1p = null;
            this.$1e = null;
            this.$1o = null;
            this.$1n = null;
            this.$1f = null;
            this.$1h = null;
            this.$1s = null;
            this.$1l = null;
            this.$1m = null;
            this.$1k = false;
            this.$1d = false;
            this.$1i = false;
            this.$1c = false;
            this.$1j = null;
            this.$1q = null;
            this.$1r = null;
            this.$1g = false;
            this.$1$1 = null;
            this.$1$2 = null;
            this.$1$3 = null;
            this.$1$4 = null;
            this.$1$5 = null;
            this.$1$6 = null;
            this.$1$7 = null;
            this.$1$8 = null;
            this.$1$9 = null;
            this.$1$10 = null;
            this.$1$11 = null;
            this.$1$12 = null;
            this.$1$13 = null;
            this.$1$14 = null;
            if (!L.hasWindowPostMessage() || !L.hasJsonParse()) {
                throw J.createBrowserNotCapable()
            }
            this.$1j = new bk(e, this);
            this.$1p = cj;
            if (ss.isNullOrUndefined(ck) || ck.nodeType !== 1) {
                ck = document.body
            }
            this.$1n = new N(ck, cl, cm);
            if (ss.isValue(cm)) {
                this.$1l = cm.onFirstInteractive;
                this.$1m = cm.onFirstVizSizeKnown
            }
        };
        bF.__typeName = 'tab.VizImpl';
        global.tab.VizImpl = bF;
        var bG = function(e, cj, ck) {
            this.$2 = null;
            bC.call(this, e, cj);
            this.$2 = ck
        };
        bG.__typeName = 'tab.VizResizeEvent';
        global.tab.VizResizeEvent = bG;
        var bH = function() {};
        bH.__typeName = 'tab.VizSize';
        bH.$ctor = function(e, cj) {
            var ck = new Object;
            ck.sheetSize = null;
            ck.chromeHeight = 0;
            ck.sheetSize = e;
            ck.chromeHeight = cj;
            return ck
        };
        bH.isInstanceOfType = function() {
            return true
        };
        global.tab.VizSize = bH;
        var bI = function(e, cj, ck) {
            this.$2 = null;
            bC.call(this, e, cj);
            this.$2 = ck
        };
        bI.__typeName = 'tab.WorksheetEvent';
        global.tab.WorksheetEvent = bI;
        var bJ = function(e, cj) {
            this.$a = false;
            this.$9 = null;
            bR.call(this, e, cj);
            this.$8(cj)
        };
        bJ.__typeName = 'tableauSoftware.CategoricalFilter';
        global.tableauSoftware.CategoricalFilter = bJ;
        var bK = function(e) {
            this.$0 = null;
            this.$0 = e
        };
        bK.__typeName = 'tableauSoftware.Column';
        global.tableauSoftware.Column = bK;
        var bL = function(e) {
            this._impl = null;
            this._impl = e
        };
        bL.__typeName = 'tableauSoftware.CustomView';
        global.tableauSoftware.CustomView = bL;
        var bM = function(e) {
            this._impl = null;
            bY.call(this, e)
        };
        bM.__typeName = 'tableauSoftware.Dashboard';
        global.tableauSoftware.Dashboard = bM;
        var bN = function(e, cj, ck) {
            this.$2 = null;
            this.$0 = null;
            this.$1 = null;
            if (e.objectType === 'worksheet' && ss.isNullOrUndefined(ck)) {
                throw J.createInternalError('worksheet parameter is required for WORKSHEET objects')
            } else if (e.objectType !== 'worksheet' && ss.isValue(ck)) {
                throw J.createInternalError('worksheet parameter should be undefined for non-WORKSHEET objects')
            }
            this.$2 = e;
            this.$0 = cj;
            this.$1 = ck
        };
        bN.__typeName = 'tableauSoftware.DashboardObject';
        global.tableauSoftware.DashboardObject = bN;
        var bO = function(e) {
            this.$0 = null;
            this.$0 = e
        };
        bO.__typeName = 'tableauSoftware.DataSource';
        global.tableauSoftware.DataSource = bO;
        var bP = function(e) {
            this.$0 = null;
            this.$0 = e
        };
        bP.__typeName = 'tableauSoftware.DataTable';
        global.tableauSoftware.DataTable = bP;
        var bQ = function(e, cj, ck, cl) {
            this.$0 = null;
            this.$3 = null;
            this.$2 = null;
            this.$1 = null;
            this.$0 = e;
            this.$3 = cj;
            this.$2 = ck;
            this.$1 = cl
        };
        bQ.__typeName = 'tableauSoftware.Field';
        global.tableauSoftware.Field = bQ;
        var bR = function(e, cj) {
            this.$7 = null;
            this.$6 = null;
            this.$1 = null;
            this.$3 = null;
            this.$2 = null;
            this.$5 = null;
            this.$4 = null;
            this.$7 = e;
            this.$0(cj)
        };
        bR.__typeName = 'tableauSoftware.Filter';
        bR.$0 = function(e, cj) {
            switch (cj.filterType) {
                case 'categorical':
                    {
                        return new bJ(e, cj)
                    }
                case 'relativedate':
                    {
                        return new bX(e, cj)
                    }
                case 'hierarchical':
                    {
                        return new bS(e, cj)
                    }
                case 'quantitative':
                    {
                        return new bW(e, cj)
                    }
            }
            return null
        };
        bR.processFiltersList = function(e, cj) {
            var ck = new tab._Collection;
            for (var cl = 0; cl < cj.filters.length; cl++) {
                var cm = cj.filters[cl];
                if (!ck._has(cm.caption)) {
                    ck._add(cm.caption, cm.caption)
                }
            }
            var cn = new tab._Collection;
            for (var co = 0; co < cj.filters.length; co++) {
                var cp = cj.filters[co];
                var cq = bR.$0(e, cp);
                if (!cn._has(cp.caption)) {
                    cn._add(cp.caption, cq);
                    continue
                }
                var cr = cp.caption.toString() + '_' + cp.filterType.toString();
                var cs = cr;
                var ct = 1;
                while (ck._has(cs)) {
                    cs = cr + '_' + ct;
                    ct++
                }
                cn._add(cs, cq)
            }
            return cn
        };
        global.tableauSoftware.Filter = bR;
        var bS = function(e, cj) {
            this.$9 = 0;
            bR.call(this, e, cj);
            this.$8(cj)
        };
        bS.__typeName = 'tableauSoftware.HierarchicalFilter';
        global.tableauSoftware.HierarchicalFilter = bS;
        var bT = function(e) {
            this.$0 = null;
            this.$0 = new l(e)
        };
        bT.__typeName = 'tableauSoftware.Mark';
        global.tableauSoftware.Mark = bT;
        var bU = function(e, cj) {
            this.fieldName = null;
            this.value = null;
            this.formattedValue = null;
            this.fieldName = e;
            this.value = cj;
            this.formattedValue = (ss.isValue(cj) ? cj.toString() : '')
        };
        bU.__typeName = 'tableauSoftware.Pair';
        global.tableauSoftware.Pair = bU;
        var bV = function(e) {
            this._impl = null;
            this._impl = e
        };
        bV.__typeName = 'tableauSoftware.Parameter';
        global.tableauSoftware.Parameter = bV;
        var bW = function(e, cj) {
            this.$a = null;
            this.$9 = null;
            this.$d = null;
            this.$c = null;
            this.$b = false;
            bR.call(this, e, cj);
            this.$8(cj)
        };
        bW.__typeName = 'tableauSoftware.QuantitativeFilter';
        global.tableauSoftware.QuantitativeFilter = bW;
        var bX = function(e, cj) {
            this.$9 = null;
            this.$b = null;
            this.$a = 0;
            bR.call(this, e, cj);
            this.$8(cj)
        };
        bX.__typeName = 'tableauSoftware.RelativeDateFilter';
        global.tableauSoftware.RelativeDateFilter = bX;
        var bY = function(e) {
            this._impl = null;
            B.verifyValue(e, 'sheetImpl');
            this._impl = e
        };
        bY.__typeName = 'tableauSoftware.Sheet';
        global.tableauSoftware.Sheet = bY;
        var bZ = function(e) {
            this.$0 = null;
            this.$0 = e
        };
        bZ.__typeName = 'tableauSoftware.SheetInfo';
        global.tableauSoftware.SheetInfo = bZ;
        var ca = function(e) {
            this._impl = null;
            bY.call(this, e)
        };
        ca.__typeName = 'tableauSoftware.Story';
        global.tableauSoftware.Story = ca;
        var cb = function(e) {
            this.$0 = null;
            this.$0 = e
        };
        cb.__typeName = 'tableauSoftware.StoryPoint';
        global.tableauSoftware.StoryPoint = cb;
        var cc = function(e) {
            this._impl = null;
            this._impl = e
        };
        cc.__typeName = 'tableauSoftware.StoryPointInfo';
        global.tableauSoftware.StoryPointInfo = cc;
        var cd = function(e) {
            this._impl = null;
            this._impl = e
        };
        cd.__typeName = 'tableauSoftware.ToolbarState';
        global.tableauSoftware.ToolbarState = cd;
        var ce = function(e, cj, ck, cl) {
            this.$0 = 0;
            this.$2 = 0;
            this.$3 = 0;
            this.$1 = null;
            this.$0 = e;
            this.$2 = cj;
            this.$3 = ck;
            this.$1 = ss.coalesce(cl, null)
        };
        ce.__typeName = 'tableauSoftware.Version';
        ce.getCurrent = function() {
            return ce.$0
        };
        global.tableauSoftware.Version = ce;
        var cf = function(e, cj, ck) {
            this._impl = null;
            var cl = q.getCrossDomainMessageRouter();
            this._impl = new bF(cl, this, e, cj, ck);
            this._impl.$4()
        };
        cf.__typeName = 'tableauSoftware.Viz';
        global.tableauSoftware.Viz = cf;
        var cg = function() {};
        cg.__typeName = 'tableauSoftware.VizManager';
        cg.getVizs = function() {
            return M.$4()
        };
        global.tableauSoftware.VizManager = cg;
        var ch = function(e) {
            this.$0 = null;
            this.$0 = e
        };
        ch.__typeName = 'tableauSoftware.Workbook';
        global.tableauSoftware.Workbook = ch;
        var ci = function(e) {
            this._impl = null;
            bY.call(this, e)
        };
        ci.__typeName = 'tableauSoftware.Worksheet';
        global.tableauSoftware.Worksheet = ci;
        ss.initInterface(bt, a, {
            registerHandler: null,
            unregisterHandler: null,
            sendCommand: null
        });
        ss.initClass(b, a, {
            registerHandler: function(e) {
                var cj = 'host' + this.$a;
                if (ss.isValue(e.get_hostId()) || ss.isValue(this.$9[e.get_hostId()])) {
                    throw J.createInternalError("Host '" + e.get_hostId() + "' is already registered.")
                }
                this.$a++;
                e.set_hostId(cj);
                this.$9[cj] = e;
                e.add_customViewsListLoad(ss.mkdel(this, this.$3));
                e.add_stateReadyForQuery(ss.mkdel(this, this.$5))
            },
            unregisterHandler: function(e) {
                if (ss.isValue(e.get_hostId()) || ss.isValue(this.$9[e.get_hostId()])) {
                    delete this.$9[e.get_hostId()];
                    e.remove_customViewsListLoad(ss.mkdel(this, this.$3));
                    e.remove_stateReadyForQuery(ss.mkdel(this, this.$5))
                }
            },
            sendCommand: function(e) {
                return function(cj, ck, cl) {
                    var cm = cj.get_iframe();
                    var cn = cj.get_hostId();
                    if (!L.hasWindowPostMessage() || ss.isNullOrUndefined(cm) || ss.isNullOrUndefined(cm.contentWindow)) {
                        return
                    }
                    var co = p.generateNextCommandId();
                    var cp = this.$6[cn];
                    if (ss.isNullOrUndefined(cp)) {
                        cp = {};
                        this.$6[cn] = cp
                    }
                    cp[co] = cl;
                    var cq = cl.get_commandName();
                    if (cq === 'api.ShowCustomViewCommand') {
                        var cr = this.$8[cn];
                        if (ss.isNullOrUndefined(cr)) {
                            cr = [];
                            this.$8[cn] = cr
                        }
                        cr.push(cl)
                    }
                    var cs = null;
                    if (ss.isValue(ck)) {
                        cs = JSON.stringify(ck)
                    }
                    var ct = new p(cq, co, cn, cs);
                    var cu = ct.serialize();
                    if (L.isPostMessageSynchronous()) {
                        window.setTimeout(function() {
                            cm.contentWindow.postMessage(cu, '*')
                        }, 0)
                    } else {
                        cm.contentWindow.postMessage(cu, '*')
                    }
                }
            },
            $3: function(e) {
                var cj = e.get_hostId();
                var ck = this.$8[cj];
                if (ss.isNullOrUndefined(ck)) {
                    return
                }
                for (var cl = 0; cl < ck.length; cl++) {
                    var cm = ck[cl];
                    if (!ss.staticEquals(cm.get_successCallback(), null)) {
                        cm.get_successCallback()(null)
                    }
                }
                delete this.$8[cj]
            },
            $5: function(e) {
                var cj = this.$7[e.get_hostId()];
                if (L.isNullOrEmpty(cj)) {
                    return
                }
                while (cj.length > 0) {
                    var ck = cj.pop();
                    if (ss.isValue(ck)) {
                        ck()
                    }
                }
            },
            $1: function(e) {
                var cj = e;
                if (ss.isNullOrUndefined(cj.data)) {
                    return
                }
                var ck = p.parse(cj.data.toString());
                var cl = ck.get_rawName();
                var cm = ck.get_hostId();
                var cn = this.$9[cm];
                if (ss.isNullOrUndefined(cn) || !ss.referenceEquals(cn.get_hostId(), ck.get_hostId())) {
                    cn = this.$0(cj)
                }
                if (ck.get_isApiCommandName()) {
                    if (ck.get_commandId() === 'xdomainSourceId') {
                        cn.handleEventNotification(ck.get_name(), ck.get_parameters());
                        if (ck.get_name() === 'api.FirstVizSizeKnownEvent') {
                            cj.source.postMessage('tableau.bootstrap', '*')
                        }
                    } else {
                        this.$2(ck)
                    }
                } else {
                    this.$4(cl, cn)
                }
            },
            $2: function(e) {
                var cj = this.$6[e.get_hostId()];
                var ck = (ss.isValue(cj) ? cj[e.get_commandId()] : null);
                if (ss.isNullOrUndefined(ck)) {
                    return
                }
                delete cj[e.get_commandId()];
                if (e.get_name() !== ck.get_commandName()) {
                    return
                }
                var cl = new s(e.get_parameters());
                var cm = cl.get_data();
                if (cl.get_result() === 'api.success') {
                    switch (ck.get_successCallbackTiming()) {
                        case 0:
                            {
                                if (ss.isValue(ck.get_successCallback())) {
                                    ck.get_successCallback()(cm)
                                }
                                break
                            }
                        case 1:
                            {
                                var cn = function() {
                                    if (ss.isValue(ck.get_successCallback())) {
                                        ck.get_successCallback()(cm)
                                    }
                                };
                                var co = this.$7[e.get_hostId()];
                                if (ss.isNullOrUndefined(co)) {
                                    co = [];
                                    this.$7[e.get_hostId()] = co
                                }
                                co.push(cn);
                                break
                            }
                        default:
                            {
                                throw J.createInternalError('Unknown timing value: ' + ck.get_successCallbackTiming())
                            }
                    }
                } else if (ss.isValue(ck.get_errorCallback())) {
                    var cp = cl.get_result() === 'api.remotefailed';
                    var cq = (ss.isValue(cm) ? cm.toString() : '');
                    ck.get_errorCallback()(cp, cq)
                }
            },
            $4: function(e, cj) {
                if (e === 'layoutInfoReq') {
                    M.$1()
                } else if (e === 'tableau.completed' || e === 'completed') {
                    cj.handleVizLoad()
                } else if (e === 'tableau.listening') {
                    cj.handleVizListening()
                }
            },
            $0: function(e) {
                var cj = new ss.ObjectEnumerator(this.$9);
                try {
                    while (cj.moveNext()) {
                        var ck = cj.current();
                        if (this.$9.hasOwnProperty(ck.key) && ss.referenceEquals(ck.value.get_iframe().contentWindow, e.source)) {
                            return ck.value
                        }
                    }
                } finally {
                    cj.dispose()
                }
                return new c
            }
        }, null, [bt]);
        ss.initInterface(bs, a, {
            add_customViewsListLoad: null,
            remove_customViewsListLoad: null,
            add_stateReadyForQuery: null,
            remove_stateReadyForQuery: null,
            get_iframe: null,
            get_hostId: null,
            set_hostId: null,
            handleVizLoad: null,
            handleVizListening: null,
            handleEventNotification: null
        });
        ss.initClass(c, a, {
            add_customViewsListLoad: function(e) {
                this.$1$1 = ss.delegateCombine(this.$1$1, e)
            },
            remove_customViewsListLoad: function(e) {
                this.$1$1 = ss.delegateRemove(this.$1$1, e)
            },
            add_stateReadyForQuery: function(e) {
                this.$1$2 = ss.delegateCombine(this.$1$2, e)
            },
            remove_stateReadyForQuery: function(e) {
                this.$1$2 = ss.delegateRemove(this.$1$2, e)
            },
            get_iframe: function() {
                return null
            },
            get_hostId: function() {
                return this.$2
            },
            set_hostId: function(e) {
                this.$2 = e
            },
            $1: function() {
                return '*'
            },
            handleVizLoad: function() {},
            handleVizListening: function() {},
            handleEventNotification: function(e, cj) {},
            $0: function() {
                this.$1$1(null);
                this.$1$2(null)
            }
        }, null, [bs]);
        ss.initClass(bo, a, {
            get__workbookImpl: function() {
                return this.$0
            },
            get__worksheetImpl: function() {
                return this.$1
            }
        });
        ss.initClass(d, a, {}, bo);
        ss.initClass(f, a, {
            get__parameterName: function() {
                return this.$2
            }
        }, bo);
        ss.initClass(g, a, {
            get__customViewImpl: function() {
                return this.$2
            }
        }, bo);
        ss.initClass(h, a, {
            get__filterFieldName: function() {
                return this.$3
            },
            $2: function() {
                return this.$4
            }
        }, bo);
        ss.initClass(i, a, {}, bo);
        ss.initClass(j, a, {});
        ss.initClass(k, a, {});
        ss.initClass(l, a, {
            $2: function() {
                return this.$5
            },
            $3: function() {
                return this.$6
            },
            $1: function() {
                if (ss.isNullOrUndefined(this.$4)) {
                    this.$4 = this.$5._toApiCollection()
                }
                return this.$4
            },
            $0: function(e) {
                this.$5._add(e.fieldName, e)
            }
        });
        ss.initClass(m, a, {
            $8: function() {
                if (ss.isNullOrUndefined(this.$i)) {
                    this.$i = new bV(this)
                }
                return this.$i
            },
            $7: function() {
                return this.$h
            },
            $2: function() {
                return this.$c
            },
            $3: function() {
                return this.$d
            },
            $1: function() {
                return this.$b
            },
            $0: function() {
                return this.$a
            },
            $6: function() {
                return this.$g
            },
            $5: function() {
                return this.$f
            },
            $9: function() {
                return this.$j
            },
            $4: function() {
                return this.$e
            }
        });
        ss.initClass(n, a, {});
        ss.initClass(o, a, {});
        ss.initClass(p, a, {
            get_name: function() {
                return this.$1$1
            },
            set_name: function(e) {
                this.$1$1 = e
            },
            get_hostId: function() {
                return this.$1$2
            },
            set_hostId: function(e) {
                this.$1$2 = e
            },
            get_commandId: function() {
                return this.$1$3
            },
            set_commandId: function(e) {
                this.$1$3 = e
            },
            get_parameters: function() {
                return this.$1$4
            },
            set_parameters: function(e) {
                this.$1$4 = e
            },
            get_isApiCommandName: function() {
                return this.get_rawName().indexOf('api.', 0) === 0
            },
            get_rawName: function() {
                return this.get_name().toString()
            },
            serialize: function() {
                var e = [];
                e.push(this.get_name());
                e.push(this.get_commandId());
                e.push(this.get_hostId());
                if (ss.isValue(this.get_parameters())) {
                    e.push(this.get_parameters())
                }
                var cj = e.join(',');
                return cj
            }
        });
        ss.initClass(q, a, {});
        ss.initClass(r, a, {
            get_workbookName: function() {
                return this.$1
            },
            get_worksheetName: function() {
                return this.$2
            },
            get_data: function() {
                return this.$0
            },
            serialize: function() {
                var e = {};
                e['api.workbookName'] = this.$1;
                e['api.worksheetName'] = this.$2;
                e['api.commandData'] = this.$0;
                return JSON.stringify(e)
            }
        });
        ss.initClass(s, a, {
            get_result: function() {
                return this.$1
            },
            get_data: function() {
                return this.$0
            }
        });
        ss.initClass(t, a, {
            get__length: function() {
                return this.$4.length
            },
            get__rawArray: function() {
                return this.$4
            },
            get_item: function(e) {
                return this.$4[e]
            },
            _get: function(e) {
                var cj = this.$0(e);
                if (ss.isValue(this.$3[cj])) {
                    return this.$3[cj]
                }
                return undefined
            },
            _has: function(e) {
                return ss.isValue(this._get(e))
            },
            _add: function(e, cj) {
                this.$1(e, cj);
                var ck = this.$0(e);
                this.$4.push(cj);
                this.$3[ck] = cj
            },
            _addToFirst: function(e, cj) {
                this.$1(e, cj);
                var ck = this.$0(e);
                this.$4.unshift(cj);
                this.$3[ck] = cj
            },
            _remove: function(e) {
                var cj = this.$0(e);
                if (ss.isValue(this.$3[cj])) {
                    var ck = this.$3[cj];
                    delete this.$3[cj];
                    for (var cl = 0; cl < this.$4.length; cl++) {
                        if (ss.referenceEquals(this.$4[cl], ck)) {
                            this.$4.splice(cl, 1);
                            break
                        }
                    }
                }
            },
            _toApiCollection: function() {
                var e = this.$4.concat();
                e.get = ss.mkdel(this, function(cj) {
                    return this._get(cj)
                });
                e.has = ss.mkdel(this, function(cj) {
                    return this._has(cj)
                });
                return e
            },
            $2: function(e) {
                if (L.isNullOrEmpty(e)) {
                    throw new ss.Exception('Null key')
                }
                if (this._has(e)) {
                    throw new ss.Exception("Duplicate key '" + e + "'")
                }
            },
            $1: function(e, cj) {
                this.$2(e);
                if (ss.isNullOrUndefined(cj)) {
                    throw new ss.Exception('Null item')
                }
            },
            $0: function(e) {
                return '_' + e
            }
        });
        ss.initClass(u, a, {
            get_fieldName: function() {
                return this.$1
            },
            get_dataType: function() {
                return this.$0
            },
            get_isReferenced: function() {
                return this.$3
            },
            get_index: function() {
                return this.$2
            }
        });
        ss.initClass(v, a, {
            $5: function() {
                if (ss.isNullOrUndefined(this.$c)) {
                    this.$c = new bL(this)
                }
                return this.$c
            },
            $b: function() {
                return this.$l.get_workbook()
            },
            $a: function() {
                return this.$k
            },
            $7: function() {
                return this.$h
            },
            $8: function(e) {
                if (this.$f) {
                    throw J.create('staleDataReference', 'Stale data')
                }
                this.$h = e
            },
            $9: function() {
                return this.$i
            },
            $3: function() {
                return this.$e
            },
            $4: function(e) {
                if (this.$f) {
                    throw J.create('staleDataReference', 'Stale data')
                }
                this.$e = e
            },
            $6: function() {
                return this.$d
            },
            $2: function() {
                if (this.$f || ss.isNullOrUndefined(this.$j)) {
                    throw J.create('staleDataReference', 'Stale data')
                }
                this.$j.isPublic = this.$e;
                this.$j.name = this.$h;
                var e = new tab._Deferred;
                var cj = {};
                cj['api.customViewParam'] = this.$j;
                var ck = v.$0('api.UpdateCustomViewCommand', e, ss.mkdel(this, function(cl) {
                    v._processCustomViewUpdate(this.$l, this.$g, cl, true);
                    e.resolve(this.$5())
                }));
                this.$g.sendCommand(Object).call(this.$g, cj, ck);
                return e.get_promise()
            },
            $1: function() {
                var e = new tab._Deferred;
                var cj = {};
                cj['api.customViewParam'] = this.$j;
                var ck = v.$0('api.RemoveCustomViewCommand', e, ss.mkdel(this, function(cl) {
                    this.$f = true;
                    v._processCustomViews(this.$l, this.$g, cl);
                    e.resolve(this.$5())
                }));
                this.$g.sendCommand(Object).call(this.$g, cj, ck);
                return e.get_promise()
            },
            _showAsync: function() {
                if (this.$f || ss.isNullOrUndefined(this.$j)) {
                    throw J.create('staleDataReference', 'Stale data')
                }
                return v._showCustomViewAsync(this.$l, this.$g, this.$j)
            },
            $0: function(e) {
                return !ss.referenceEquals(this.$i, e.$i) || !ss.referenceEquals(this.$k, e.$k) || this.$e !== e.$e || this.$d !== e.$d
            }
        });
        ss.initClass(E, a, {
            get_sheet: null,
            get_name: function() {
                return this.$5
            },
            get_index: function() {
                return this.$1
            },
            get_workbookImpl: function() {
                return this.$a
            },
            get_workbook: function() {
                return this.$a.get_workbook()
            },
            get_url: function() {
                if (this.$3) {
                    throw J.createNoUrlForHiddenWorksheet()
                }
                return this.$9
            },
            get_size: function() {
                return this.$8
            },
            get_isHidden: function() {
                return this.$3
            },
            get_isActive: function() {
                return this.$2
            },
            set_isActive: function(e) {
                this.$2 = e
            },
            get_isDashboard: function() {
                return this.$7 === 'dashboard'
            },
            get_isStory: function() {
                return this.$7 === 'story'
            },
            get_sheetType: function() {
                return this.$7
            },
            get_parentStoryPoint: function() {
                if (ss.isValue(this.$6)) {
                    return this.$6.get_storyPoint()
                }
                return null
            },
            get_parentStoryPointImpl: function() {
                return this.$6
            },
            set_parentStoryPointImpl: function(e) {
                if (this.$7 === 'story') {
                    throw J.createInternalError('A story cannot be a child of another story.')
                }
                this.$6 = e
            },
            get_zoneId: function() {
                return this.$b
            },
            get_messagingOptions: function() {
                return this.$4
            },
            changeSizeAsync: function(e) {
                e = E.$1(e);
                if (this.$7 === 'worksheet' && e.behavior !== 'automatic') {
                    throw J.createInvalidSizeBehaviorOnWorksheet()
                }
                var cj = new tab._Deferred;
                if (this.$8.behavior === e.behavior && e.behavior === 'automatic') {
                    cj.resolve(e);
                    return cj.get_promise()
                }
                var ck = this.$0(e);
                var cl = {};
                cl['api.setSheetSizeName'] = this.$5;
                cl['api.minWidth'] = ck['api.minWidth'];
                cl['api.minHeight'] = ck['api.minHeight'];
                cl['api.maxWidth'] = ck['api.maxWidth'];
                cl['api.maxHeight'] = ck['api.maxHeight'];
                var cm = new(ss.makeGenericType(bj, [Object]))('api.SetSheetSizeCommand', 1, ss.mkdel(this, function(cn) {
                    this.get_workbookImpl()._update(ss.mkdel(this, function() {
                        var co = this.get_workbookImpl().get_publishedSheets()._get(this.get_name()).getSize();
                        cj.resolve(co)
                    }))
                }), function(cn, co) {
                    cj.reject(J.createServerError(co))
                });
                this.sendCommand(Object).call(this, cl, cm);
                return cj.get_promise()
            },
            sendCommand: function(e) {
                return function(cj, ck) {
                    this.$4.sendCommand(e).call(this.$4, cj, ck)
                }
            },
            $0: function(e) {
                var cj = null;
                if (ss.isNullOrUndefined(e) || ss.isNullOrUndefined(e.behavior) || e.behavior !== 'automatic' && ss.isNullOrUndefined(e.minSize) && ss.isNullOrUndefined(e.maxSize)) {
                    throw J.createInvalidSheetSizeParam()
                }
                var ck = 0;
                var cl = 0;
                var cm = 0;
                var cn = 0;
                var co = {};
                co['api.minWidth'] = 0;
                co['api.minHeight'] = 0;
                co['api.maxWidth'] = 0;
                co['api.maxHeight'] = 0;
                if (e.behavior === 'automatic') {
                    cj = bx.$ctor('automatic', undefined, undefined)
                } else if (e.behavior === 'atmost') {
                    if (ss.isNullOrUndefined(e.maxSize) || ss.isNullOrUndefined(e.maxSize.width) || ss.isNullOrUndefined(e.maxSize.height)) {
                        throw J.createMissingMaxSize()
                    }
                    if (e.maxSize.width < 0 || e.maxSize.height < 0) {
                        throw J.createInvalidSizeValue()
                    }
                    co['api.maxWidth'] = e.maxSize.width;
                    co['api.maxHeight'] = e.maxSize.height;
                    cj = bx.$ctor('atmost', undefined, e.maxSize)
                } else if (e.behavior === 'atleast') {
                    if (ss.isNullOrUndefined(e.minSize) || ss.isNullOrUndefined(e.minSize.width) || ss.isNullOrUndefined(e.minSize.height)) {
                        throw J.createMissingMinSize()
                    }
                    if (e.minSize.width < 0 || e.minSize.height < 0) {
                        throw J.createInvalidSizeValue()
                    }
                    co['api.minWidth'] = e.minSize.width;
                    co['api.minHeight'] = e.minSize.height;
                    cj = bx.$ctor('atleast', e.minSize, undefined)
                } else if (e.behavior === 'range') {
                    if (ss.isNullOrUndefined(e.minSize) || ss.isNullOrUndefined(e.maxSize) || ss.isNullOrUndefined(e.minSize.width) || ss.isNullOrUndefined(e.maxSize.width) || ss.isNullOrUndefined(e.minSize.height) || ss.isNullOrUndefined(e.maxSize.height)) {
                        throw J.createMissingMinMaxSize()
                    }
                    if (e.minSize.width < 0 || e.minSize.height < 0 || e.maxSize.width < 0 || e.maxSize.height < 0 || e.minSize.width > e.maxSize.width || e.minSize.height > e.maxSize.height) {
                        throw J.createInvalidRangeSize()
                    }
                    co['api.minWidth'] = e.minSize.width;
                    co['api.minHeight'] = e.minSize.height;
                    co['api.maxWidth'] = e.maxSize.width;
                    co['api.maxHeight'] = e.maxSize.height;
                    cj = bx.$ctor('range', e.minSize, e.maxSize)
                } else if (e.behavior === 'exactly') {
                    if (ss.isValue(e.minSize) && ss.isValue(e.maxSize) && ss.isValue(e.minSize.width) && ss.isValue(e.maxSize.width) && ss.isValue(e.minSize.height) && ss.isValue(e.maxSize.height)) {
                        ck = e.minSize.width;
                        cl = e.minSize.height;
                        cm = e.maxSize.width;
                        cn = e.maxSize.height;
                        if (ck !== cm || cl !== cn) {
                            throw J.createSizeConflictForExactly()
                        }
                    } else if (ss.isValue(e.minSize) && ss.isValue(e.minSize.width) && ss.isValue(e.minSize.height)) {
                        ck = e.minSize.width;
                        cl = e.minSize.height;
                        cm = ck;
                        cn = cl
                    } else if (ss.isValue(e.maxSize) && ss.isValue(e.maxSize.width) && ss.isValue(e.maxSize.height)) {
                        cm = e.maxSize.width;
                        cn = e.maxSize.height;
                        ck = cm;
                        cl = cn
                    }
                    co['api.minWidth'] = ck;
                    co['api.minHeight'] = cl;
                    co['api.maxWidth'] = cm;
                    co['api.maxHeight'] = cn;
                    cj = bx.$ctor('exactly', bz.$ctor(ck, cl), bz.$ctor(cm, cn))
                }
                this.$8 = cj;
                return co
            }
        });
        ss.initClass(w, a, {
            get_sheet: function() {
                return this.get_dashboard()
            },
            get_dashboard: function() {
                if (ss.isNullOrUndefined(this.$d)) {
                    this.$d = new bM(this)
                }
                return this.$d
            },
            get_worksheets: function() {
                return this.$f
            },
            get_objects: function() {
                return this.$e
            },
            $c: function(e, cj) {
                this.$e = new tab._Collection;
                this.$f = new tab._Collection;
                for (var ck = 0; ck < e.length; ck++) {
                    var cl = e[ck];
                    var cm = null;
                    if (e[ck].objectType === 'worksheet') {
                        var cn = cl.name;
                        if (ss.isNullOrUndefined(cn)) {
                            continue
                        }
                        var co = this.$f.get__length();
                        var cp = by.createAutomatic();
                        var cq = false;
                        var cr = cj(cn);
                        var cs = ss.isNullOrUndefined(cr);
                        var ct = (cs ? '' : cr.getUrl());
                        var cu = F.$ctor(cn, 'worksheet', co, cp, this.get_workbook(), ct, cq, cs, cl.zoneId);
                        var cv = new P(cu, this.get_workbookImpl(), this.get_messagingOptions(), this);
                        cm = cv.get_worksheet();
                        this.$f._add(cn, cv.get_worksheet())
                    }
                    var cw = new bN(cl, this.get_dashboard(), cm);
                    this.$e._add(ck.toString(), cw)
                }
            }
        }, E);
        ss.initClass(x, a, {
            get_dataSource: function() {
                if (ss.isNullOrUndefined(this.$0)) {
                    this.$0 = new bO(this)
                }
                return this.$0
            },
            get_name: function() {
                return this.$3
            },
            get_fields: function() {
                return this.$1
            },
            get_isPrimary: function() {
                return this.$2
            },
            addField: function(e) {
                this.$1._add(e.getName(), e)
            }
        });
        ss.initClass(y, a, {
            get_name: function() {
                return this.$2
            },
            get_rows: function() {
                return this.$3
            },
            get_columns: function() {
                return this.$0
            },
            get_totalRowCount: function() {
                return this.$4
            },
            get_isSummaryData: function() {
                return this.$1
            }
        });
        ss.initClass(z, a, {
            get_promise: function() {
                return this.$3
            },
            all: function(e) {
                var cj = new z;
                var ck = e.length;
                var cl = ck;
                var cm = [];
                if (ck === 0) {
                    cj.resolve(cm);
                    return cj.get_promise()
                }
                var cn = function(cp, cq) {
                    var cr = k.$0(cp);
                    cr.then(function(cs) {
                        cm[cq] = cs;
                        cl--;
                        if (cl === 0) {
                            cj.resolve(cm)
                        }
                        return null
                    }, function(cs) {
                        cj.reject(cs);
                        return null
                    })
                };
                for (var co = 0; co < ck; co++) {
                    cn(e[co], co)
                }
                return cj.get_promise()
            },
            then: function(e, cj) {
                return this.$5(e, cj)
            },
            resolve: function(e) {
                return this.$4(e)
            },
            reject: function(e) {
                return this.$4(k.$3(e))
            },
            $0: function(e, cj) {
                var ck = new z;
                this.$2.push(function(cl) {
                    cl.then(e, cj).then(ss.mkdel(ck, ck.resolve), ss.mkdel(ck, ck.reject))
                });
                return ck.get_promise()
            },
            $1: function(e) {
                var cj = k.$0(e);
                this.$5 = cj.then;
                this.$4 = k.$0;
                for (var ck = 0; ck < this.$2.length; ck++) {
                    var cl = this.$2[ck];
                    cl(cj)
                }
                this.$2 = null;
                return cj
            }
        });
        ss.initClass(A, a, {});
        ss.initClass(B, a, {});
        ss.initClass(C, a, {
            always: function(e) {
                return this.then(e, e)
            },
            otherwise: function(e) {
                return this.then(null, e)
            }
        });
        ss.initClass(D, a, {
            intersect: function(e) {
                var cj = Math.max(this.left, e.left);
                var ck = Math.max(this.top, e.top);
                var cl = Math.min(this.left + this.width, e.left + e.width);
                var cm = Math.min(this.top + this.height, e.top + e.height);
                if (cl <= cj || cm <= ck) {
                    return new D(0, 0, 0, 0)
                }
                return new D(cj, ck, cl - cj, cm - ck)
            }
        });
        ss.initClass(F, a, {}, Object);
        ss.initClass(G, a, {
            add_activeStoryPointChange: function(e) {
                this.$2$1 = ss.delegateCombine(this.$2$1, e)
            },
            remove_activeStoryPointChange: function(e) {
                this.$2$1 = ss.delegateRemove(this.$2$1, e)
            },
            get_activeStoryPointImpl: function() {
                return this.$g
            },
            get_sheet: function() {
                return this.get_story()
            },
            get_story: function() {
                if (ss.isNullOrUndefined(this.$i)) {
                    this.$i = new ca(this)
                }
                return this.$i
            },
            get_storyPointsInfo: function() {
                return this.$j
            },
            update: function(e) {
                var cj = null;
                var ck = null;
                this.$j = this.$j || new Array(e.storyPoints.length);
                for (var cl = 0; cl < e.storyPoints.length; cl++) {
                    var cm = e.storyPoints[cl];
                    var cn = cm.caption;
                    var co = cl === e.activeStoryPointIndex;
                    var cp = I.$ctor(cn, cl, cm.storyPointId, co, cm.isUpdated, this);
                    if (ss.isNullOrUndefined(this.$j[cl])) {
                        this.$j[cl] = new cc(cp)
                    } else if (this.$j[cl]._impl.storyPointId === cp.storyPointId) {
                        var cq = this.$j[cl]._impl;
                        cq.caption = cp.caption;
                        cq.index = cp.index;
                        cq.isActive = co;
                        cq.isUpdated = cp.isUpdated
                    } else {
                        this.$j[cl] = new cc(cp)
                    }
                    if (co) {
                        cj = cm.containedSheetInfo;
                        ck = cp
                    }
                }
                var cr = this.$j.length - e.storyPoints.length;
                this.$j.splice(e.storyPoints.length, cr);
                var cs = ss.isNullOrUndefined(this.$g) || this.$g.get_storyPointId() !== ck.storyPointId;
                if (ss.isValue(this.$g) && cs) {
                    this.$g.set_isActive(false)
                }
                var ct = this.$g;
                if (cs) {
                    var cu = H.createContainedSheet(cj, this.get_workbookImpl(), this.get_messagingOptions(), this.$h);
                    this.$g = new H(ck, cu)
                } else {
                    this.$g.set_isActive(ck.isActive);
                    this.$g.set_isUpdated(ck.isUpdated)
                }
                if (cs && ss.isValue(ct)) {
                    this.$d(this.$j[ct.get_index()], this.$g.get_storyPoint())
                }
            },
            activatePreviousStoryPointAsync: function() {
                return this.$c('api.ActivatePreviousStoryPoint')
            },
            activateNextStoryPointAsync: function() {
                return this.$c('api.ActivateNextStoryPoint')
            },
            activateStoryPointAsync: function(e) {
                var cj = new tab._Deferred;
                if (e < 0 || e >= this.$j.length) {
                    throw J.createIndexOutOfRange(e)
                }
                var ck = this.get_activeStoryPointImpl();
                var cl = {};
                cl['api.storyPointIndex'] = e;
                var cm = new(ss.makeGenericType(bj, [Object]))('api.ActivateStoryPoint', 0, ss.mkdel(this, function(cn) {
                    this.$e(ck, cn);
                    cj.resolve(this.$g.get_storyPoint())
                }), function(cn, co) {
                    cj.reject(J.createServerError(co))
                });
                this.sendCommand(Object).call(this, cl, cm);
                return cj.get_promise()
            },
            revertStoryPointAsync: function(e) {
                e = e || this.$g.get_index();
                if (e < 0 || e >= this.$j.length) {
                    throw J.createIndexOutOfRange(e)
                }
                var cj = new tab._Deferred;
                var ck = {};
                ck['api.storyPointIndex'] = e;
                var cl = new(ss.makeGenericType(bj, [Object]))('api.RevertStoryPoint', 0, ss.mkdel(this, function(cm) {
                    this.$f(e, cm);
                    cj.resolve(this.$j[e])
                }), function(cm, cn) {
                    cj.reject(J.createServerError(cn))
                });
                this.sendCommand(Object).call(this, ck, cl);
                return cj.get_promise()
            },
            $c: function(e) {
                if (e !== 'api.ActivatePreviousStoryPoint' && e !== 'api.ActivateNextStoryPoint') {
                    throw J.createInternalError("commandName '" + e + "' is invalid.")
                }
                var cj = new tab._Deferred;
                var ck = this.get_activeStoryPointImpl();
                var cl = {};
                var cm = new(ss.makeGenericType(bj, [Object]))(e, 0, ss.mkdel(this, function(cn) {
                    this.$e(ck, cn);
                    cj.resolve(this.$g.get_storyPoint())
                }), function(cn, co) {
                    cj.reject(J.createServerError(co))
                });
                this.sendCommand(Object).call(this, cl, cm);
                return cj.get_promise()
            },
            $f: function(e, cj) {
                var ck = this.$j[e]._impl;
                if (ck.storyPointId !== cj.storyPointId) {
                    throw J.createInternalError("We should not be updating a story point where the IDs don't match. Existing storyPointID=" + ck.storyPointId + ', newStoryPointID=' + cj.storyPointId)
                }
                ck.caption = cj.caption;
                ck.isUpdated = cj.isUpdated;
                if (cj.storyPointId === this.$g.get_storyPointId()) {
                    this.$g.set_isUpdated(cj.isUpdated)
                }
            },
            $e: function(e, cj) {
                var ck = cj.index;
                if (e.get_index() === ck) {
                    return
                }
                var cl = this.$j[e.get_index()];
                var cm = this.$j[ck]._impl;
                var cn = H.createContainedSheet(cj.containedSheetInfo, this.get_workbookImpl(), this.get_messagingOptions(), this.$h);
                cm.isActive = true;
                this.$g = new H(cm, cn);
                e.set_isActive(false);
                cl._impl.isActive = false;
                this.$d(cl, this.$g.get_storyPoint())
            },
            $d: function(e, cj) {
                if (!ss.staticEquals(this.$2$1, null)) {
                    this.$2$1(e, cj)
                }
            }
        }, E);
        ss.initClass(H, a, {
            get_caption: function() {
                return this.$1
            },
            get_containedSheetImpl: function() {
                return this.$2
            },
            get_index: function() {
                return this.$3
            },
            get_isActive: function() {
                return this.$4
            },
            set_isActive: function(e) {
                this.$4 = e
            },
            get_isUpdated: function() {
                return this.$5
            },
            set_isUpdated: function(e) {
                this.$5 = e
            },
            get_parentStoryImpl: function() {
                return this.$6
            },
            get_storyPoint: function() {
                if (ss.isNullOrUndefined(this.$7)) {
                    this.$7 = new cb(this)
                }
                return this.$7
            },
            get_storyPointId: function() {
                return this.$8
            },
            $0: function() {
                return I.$ctor(this.$1, this.$3, this.$8, this.$4, this.$5, this.$6)
            }
        });
        ss.initClass(I, a, {}, Object);
        ss.initClass(J, a, {});
        ss.initClass(K, a, {
            get_toolbarState: function() {
                if (ss.isNullOrUndefined(this.$0)) {
                    this.$0 = new cd(this)
                }
                return this.$0
            },
            get_viz: function() {
                return this.$2.$18()
            },
            isButtonEnabled: function(e) {
                switch (e) {
                    case 'redo':
                        {
                            return this.$1.canRedo
                        }
                    case 'undo':
                        {
                            return this.$1.canUndo
                        }
                    default:
                        {
                            throw J.$1(e)
                        }
                }
            }
        });
        ss.initClass(L, a, {});
        ss.initClass(M, a, {});
        ss.initClass(N, a, {
            get_url: function() {
                return this.$0()
            },
            get_baseUrl: function() {
                return this.$2
            },
            $0: function() {
                var e = [];
                e.push(this.get_baseUrl());
                e.push('?');
                if (this.userSuppliedParameters.length > 0) {
                    e.push(this.userSuppliedParameters);
                    e.push('&')
                }
                var cj = !this.fixedSize && !(this.userSuppliedParameters.indexOf(':size=') !== -1) && this.parentElement.clientWidth * this.parentElement.clientHeight > 0;
                if (cj) {
                    e.push(':size=');
                    e.push(this.parentElement.clientWidth + ',' + this.parentElement.clientHeight);
                    e.push('&')
                }
                e.push(':embed=y');
                e.push('&:showVizHome=n');
                if (!this.fixedSize) {
                    e.push('&:bootstrapWhenNotified=y')
                }
                if (!this.tabs) {
                    e.push('&:tabs=n')
                }
                if (this.displayStaticImage) {
                    e.push('&:display_static_image=y')
                }
                if (!this.toolbar) {
                    e.push('&:toolbar=n')
                } else if (!ss.isNullOrUndefined(this.toolBarPosition)) {
                    e.push('&:toolbar=');
                    e.push(this.toolBarPosition.toString())
                }
                if (ss.isValue(this.device)) {
                    e.push('&:device=');
                    e.push(this.device.toString())
                }
                var ck = this.$1;
                var cl = new ss.ObjectEnumerator(ck);
                try {
                    while (cl.moveNext()) {
                        var cm = cl.current();
                        if (cm.key !== 'embed' && cm.key !== 'height' && cm.key !== 'width' && cm.key !== 'device' && cm.key !== 'autoSize' && cm.key !== 'hideTabs' && cm.key !== 'hideToolbar' && cm.key !== 'onFirstInteractive' && cm.key !== 'onFirstVizSizeKnown' && cm.key !== 'toolbarPosition' && cm.key !== 'instanceIdToClone' && cm.key !== 'display_static_image') {
                            e.push('&');
                            e.push(encodeURIComponent(cm.key));
                            e.push('=');
                            e.push(encodeURIComponent(cm.value.toString()))
                        }
                    }
                } finally {
                    cl.dispose()
                }
                e.push('&:apiID=' + this.hostId);
                if (ss.isValue(this.$1.instanceIdToClone)) {
                    e.push('#' + this.$1.instanceIdToClone)
                }
                return e.join('')
            }
        });
        ss.initClass(O, a, {
            get_workbook: function() {
                if (ss.isNullOrUndefined(this.$E)) {
                    this.$E = new ch(this)
                }
                return this.$E
            },
            get_viz: function() {
                return this.$D.$18()
            },
            get_publishedSheets: function() {
                return this.$A
            },
            get_name: function() {
                return this.$y
            },
            get_activeSheetImpl: function() {
                return this.$s
            },
            get_activeCustomView: function() {
                return this.$t
            },
            get_isDownloadAllowed: function() {
                return this.$v
            },
            $4: function(e) {
                if (ss.isNullOrUndefined(this.$s)) {
                    return null
                }
                var cj = O.$2(e);
                if (ss.isNullOrUndefined(cj)) {
                    return null
                }
                if (ss.referenceEquals(cj, this.$s.get_name())) {
                    return this.$s
                }
                if (this.$s.get_isDashboard()) {
                    var ck = this.$s;
                    var cl = ck.get_worksheets()._get(cj);
                    if (ss.isValue(cl)) {
                        return cl._impl
                    }
                }
                return null
            },
            _setActiveSheetAsync: function(e) {
                if (L.isNumber(e)) {
                    var cj = e;
                    if (cj < this.$A.get__length() && cj >= 0) {
                        return this.$1(this.$A.get_item(cj).$0)
                    } else {
                        throw J.createIndexOutOfRange(cj)
                    }
                }
                var ck = O.$2(e);
                var cl = this.$A._get(ck);
                if (ss.isValue(cl)) {
                    return this.$1(cl.$0)
                } else if (this.$s.get_isDashboard()) {
                    var cm = this.$s;
                    var cn = cm.get_worksheets()._get(ck);
                    if (ss.isValue(cn)) {
                        this.$r = null;
                        var co = '';
                        if (cn.getIsHidden()) {
                            this.$r = cn._impl
                        } else {
                            co = cn._impl.get_url()
                        }
                        return this.$0(cn._impl.get_name(), co)
                    }
                }
                throw J.create('sheetNotInWorkbook', 'Sheet is not found in Workbook')
            },
            _revertAllAsync: function() {
                var e = new tab._Deferred;
                var cj = new(ss.makeGenericType(bj, [Object]))('api.RevertAllCommand', 1, function(ck) {
                    e.resolve()
                }, function(ck, cl) {
                    e.reject(J.createServerError(cl))
                });
                this.$d(Object).call(this, null, cj);
                return e.get_promise()
            },
            _update: function(e) {
                this.$5(e)
            },
            $1: function(e) {
                return this.$0(e.name, e.url)
            },
            $0: function(e, cj) {
                var ck = new tab._Deferred;
                if (ss.isValue(this.$s) && ss.referenceEquals(e, this.$s.get_name())) {
                    ck.resolve(this.$s.get_sheet());
                    return ck.get_promise()
                }
                var cl = {};
                cl['api.switchToSheetName'] = e;
                cl['api.switchToRepositoryUrl'] = cj;
                cl['api.oldRepositoryUrl'] = this.$s.get_url();
                var cm = new(ss.makeGenericType(bj, [Object]))('api.SwitchActiveSheetCommand', 0, ss.mkdel(this, function(cn) {
                    this.$D.$1b = ss.mkdel(this, function() {
                        this.$D.$1b = null;
                        ck.resolve(this.$s.get_sheet())
                    })
                }), function(cn, co) {
                    ck.reject(J.createServerError(co))
                });
                this.$d(Object).call(this, cl, cm);
                return ck.get_promise()
            },
            _updateActiveSheetAsync: function() {
                var e = new tab._Deferred;
                var cj = {};
                cj['api.switchToSheetName'] = this.$s.get_name();
                cj['api.switchToRepositoryUrl'] = this.$s.get_url();
                cj['api.oldRepositoryUrl'] = this.$s.get_url();
                var ck = new(ss.makeGenericType(bj, [Object]))('api.UpdateActiveSheetCommand', 0, ss.mkdel(this, function(cl) {
                    e.resolve(this.$s.get_sheet())
                }), function(cl, cm) {
                    e.reject(J.createServerError(cm))
                });
                this.$d(Object).call(this, cj, ck);
                return e.get_promise()
            },
            $d: function(e) {
                return function(cj, ck) {
                    this.$x.sendCommand(e).call(this.$x, cj, ck)
                }
            },
            $5: function(e) {
                var cj = new(ss.makeGenericType(bj, [Object]))('api.GetClientInfoCommand', 0, ss.mkdel(this, function(ck) {
                    this.$a(ck);
                    if (ss.isValue(e)) {
                        e()
                    }
                }), null);
                this.$d(Object).call(this, null, cj)
            },
            $a: function(e) {
                this.$y = e.workbookName;
                this.$v = e.isDownloadAllowed;
                this.$D.$P(!e.isAutoUpdate);
                this.$D.set_instanceId(e.instanceId);
                this.$3(e);
                this.$9(e)
            },
            $9: function(e) {
                var cj = e.currentSheetName;
                var ck = this.$A._get(cj);
                if (ss.isNullOrUndefined(ck) && ss.isNullOrUndefined(this.$r)) {
                    throw J.createInternalError('The active sheet was not specified in baseSheets')
                }
                if (ss.isValue(this.$s) && ss.referenceEquals(this.$s.get_name(), cj)) {
                    return
                }
                if (ss.isValue(this.$s)) {
                    this.$s.set_isActive(false);
                    var cl = this.$A._get(this.$s.get_name());
                    if (ss.isValue(cl)) {
                        cl.$0.isActive = false
                    }
                    if (this.$s.get_sheetType() === 'story') {
                        var cm = this.$s;
                        cm.remove_activeStoryPointChange(ss.mkdel(this.$D, this.$D.raiseStoryPointSwitch))
                    }
                }
                if (ss.isValue(this.$r)) {
                    var cn = F.$ctor(this.$r.get_name(), 'worksheet', -1, this.$r.get_size(), this.get_workbook(), '', true, true, 4294967295);
                    this.$r = null;
                    this.$s = new P(cn, this, this.$x, null)
                } else {
                    var co = null;
                    for (var cp = 0, cq = e.publishedSheets.length; cp < cq; cp++) {
                        if (ss.referenceEquals(e.publishedSheets[cp].name, cj)) {
                            co = e.publishedSheets[cp];
                            break
                        }
                    }
                    if (ss.isNullOrUndefined(co)) {
                        throw J.createInternalError('No base sheet was found corresponding to the active sheet.')
                    }
                    var cr = ss.mkdel(this, function(cv) {
                        return this.$A._get(cv)
                    });
                    if (co.sheetType === 'dashboard') {
                        var cs = new w(ck.$0, this, this.$x);
                        this.$s = cs;
                        var ct = O.$0(e.dashboardZones);
                        cs.$c(ct, cr)
                    } else if (co.sheetType === 'story') {
                        var cu = new G(ck.$0, this, this.$x, e.story, cr);
                        this.$s = cu;
                        cu.add_activeStoryPointChange(ss.mkdel(this.$D, this.$D.raiseStoryPointSwitch))
                    } else {
                        this.$s = new P(ck.$0, this, this.$x, null)
                    }
                    ck.$0.isActive = true
                }
                this.$s.set_isActive(true)
            },
            $3: function(e) {
                var cj = e.publishedSheets;
                if (ss.isNullOrUndefined(cj)) {
                    return
                }
                for (var ck = 0; ck < cj.length; ck++) {
                    var cl = cj[ck];
                    var cm = cl.name;
                    var cn = this.$A._get(cm);
                    var co = O.$1(cl);
                    if (ss.isNullOrUndefined(cn)) {
                        var cp = ss.referenceEquals(cm, e.currentSheetName);
                        var cq = T.convertSheetType(cl.sheetType);
                        var cr = F.$ctor(cm, cq, ck, co, this.get_workbook(), cl.repositoryUrl, cp, false, 4294967295);
                        cn = new bZ(cr);
                        this.$A._add(cm, cn)
                    } else {
                        cn.$0.size = co
                    }
                }
            },
            $i: function() {
                return this.$u
            },
            $j: function(e) {
                this.$u = e
            },
            $p: function() {
                return this.$C
            },
            $q: function(e) {
                this.$C = e
            },
            $n: function() {
                return this.$B
            },
            $o: function(e) {
                this.$B = e
            },
            $g: function() {
                return this.$t
            },
            $h: function(e) {
                this.$t = e
            },
            $6: function() {
                return v._getCustomViewsAsync(this, this.$x)
            },
            $f: function(e) {
                if (ss.isNullOrUndefined(e) || L.isNullOrEmpty(e)) {
                    return v._showCustomViewAsync(this, this.$x, null)
                } else {
                    var cj = this.$u._get(e);
                    if (ss.isNullOrUndefined(cj)) {
                        var ck = new tab._Deferred;
                        ck.reject(J.createInvalidCustomViewName(e));
                        return ck.get_promise()
                    }
                    return cj._impl._showAsync()
                }
            },
            $c: function(e) {
                if (L.isNullOrEmpty(e)) {
                    throw J.createNullOrEmptyParameter('customViewName')
                }
                var cj = this.$u._get(e);
                if (ss.isNullOrUndefined(cj)) {
                    var ck = new tab._Deferred;
                    ck.reject(J.createInvalidCustomViewName(e));
                    return ck.get_promise()
                }
                return cj._impl.$1()
            },
            $b: function(e) {
                if (L.isNullOrEmpty(e)) {
                    throw J.createInvalidParameter('customViewName')
                }
                return v._saveNewAsync(this, this.$x, e)
            },
            $e: function() {
                return v._makeCurrentCustomViewDefaultAsync(this, this.$x)
            },
            $k: function() {
                return this.$w
            },
            $l: function(e) {
                this.$w = e
            },
            $m: function() {
                return this.$z
            },
            $8: function(e) {
                var cj = new tab._Deferred;
                if (ss.isValue(this.$w)) {
                    cj.resolve(this.$w.$8());
                    return cj.get_promise()
                }
                var ck = {};
                var cl = new(ss.makeGenericType(bj, [Object]))('api.FetchParametersCommand', 0, ss.mkdel(this, function(cm) {
                    var cn = O.$3(e, cm);
                    this.$w = cn;
                    cj.resolve(cn.$8())
                }), function(cm, cn) {
                    cj.reject(J.createServerError(cn))
                });
                this.$d(Object).call(this, ck, cl);
                return cj.get_promise()
            },
            $7: function() {
                var e = new tab._Deferred;
                var cj = {};
                var ck = new(ss.makeGenericType(bj, [Object]))('api.FetchParametersCommand', 0, ss.mkdel(this, function(cl) {
                    this.$z = O.$4(cl);
                    e.resolve(this.$m()._toApiCollection())
                }), function(cl, cm) {
                    e.reject(J.createServerError(cm))
                });
                this.$d(Object).call(this, cj, ck);
                return e.get_promise()
            },
            $2: function(e, cj) {
                var ck = new tab._Deferred;
                var cl = null;
                if (ss.isValue(this.$z)) {
                    if (ss.isNullOrUndefined(this.$z._get(e))) {
                        ck.reject(J.createInvalidParameter(e));
                        return ck.get_promise()
                    }
                    cl = this.$z._get(e)._impl;
                    if (ss.isNullOrUndefined(cl)) {
                        ck.reject(J.createInvalidParameter(e));
                        return ck.get_promise()
                    }
                }
                var cm = {};
                cm['api.setParameterName'] = (ss.isValue(this.$z) ? cl.$7() : e);
                if (ss.isValue(cj) && L.isDate(cj)) {
                    var cn = cj;
                    var co = L.serializeDateForServer(cn);
                    cm['api.setParameterValue'] = co
                } else {
                    cm['api.setParameterValue'] = (ss.isValue(cj) ? cj.toString() : null)
                }
                this.$w = null;
                var cp = new(ss.makeGenericType(bj, [Object]))('api.SetParameterValueCommand', 0, ss.mkdel(this, function(cq) {
                    if (ss.isNullOrUndefined(cq)) {
                        ck.reject(J.create('serverError', 'server error'));
                        return
                    }
                    if (!cq.isValidPresModel) {
                        ck.reject(J.createInvalidParameter(e));
                        return
                    }
                    var cr = new m(cq);
                    this.$w = cr;
                    ck.resolve(cr.$8())
                }), function(cq, cr) {
                    ck.reject(J.createInvalidParameter(e))
                });
                this.$d(Object).call(this, cm, cp);
                return ck.get_promise()
            }
        });
        ss.initClass(P, a, {
            get_sheet: function() {
                return this.get_worksheet()
            },
            get_worksheet: function() {
                if (ss.isNullOrUndefined(this.$K)) {
                    this.$K = new ci(this)
                }
                return this.$K
            },
            get_parentDashboardImpl: function() {
                return this.$I
            },
            get_parentDashboard: function() {
                if (ss.isValue(this.$I)) {
                    return this.$I.get_dashboard()
                }
                return null
            },
            $r: function() {
                this.$G();
                var e = new tab._Deferred;
                var cj = {};
                cj['api.worksheetName'] = this.get_name();
                var ck = new(ss.makeGenericType(bj, [Object]))('api.GetDataSourcesCommand', 0, function(cl) {
                    var cm = x.processDataSourcesForWorksheet(cl);
                    e.resolve(cm._toApiCollection())
                }, function(cl, cm) {
                    e.reject(J.createServerError(cm))
                });
                this.sendCommand(Object).call(this, cj, ck);
                return e.get_promise()
            },
            $q: function(e) {
                this.$G();
                var cj = new tab._Deferred;
                var ck = {};
                ck['api.dataSourceName'] = e;
                ck['api.worksheetName'] = this.get_name();
                var cl = new(ss.makeGenericType(bj, [Object]))('api.GetDataSourceCommand', 0, function(cm) {
                    var cn = x.processDataSource(cm);
                    if (ss.isValue(cn)) {
                        cj.resolve(cn.get_dataSource())
                    } else {
                        cj.reject(J.createServerError("Data source '" + e + "' not found"))
                    }
                }, function(cm, cn) {
                    cj.reject(J.createServerError(cn))
                });
                this.sendCommand(Object).call(this, ck, cl);
                return cj.get_promise()
            },
            $G: function() {
                var e = this.get_isActive();
                var cj = ss.isValue(this.$I) && this.$I.get_isActive();
                var ck = ss.isValue(this.get_parentStoryPointImpl()) && this.get_parentStoryPointImpl().get_parentStoryImpl().get_isActive();
                if (!e && !cj && !ck) {
                    throw J.createNotActiveSheet()
                }
            },
            $d: function(e) {
                if (ss.isValue(this.get_parentStoryPointImpl())) {
                    var cj = {};
                    cj.AVP = this.get_name();
                    cj.XwZ = (ss.isValue(this.get_parentDashboardImpl()) ? this.$I.get_name() : this.get_name());
                    cj.WIZ = this.get_parentStoryPointImpl().get_containedSheetImpl().get_zoneId();
                    cj.Hna = this.get_parentStoryPointImpl().get_parentStoryImpl().get_name();
                    cj.hVl = this.get_parentStoryPointImpl().get_storyPointId();
                    e['api.visualId'] = cj
                } else {
                    e['api.worksheetName'] = this.get_name();
                    if (ss.isValue(this.get_parentDashboardImpl())) {
                        e['api.dashboardName'] = this.get_parentDashboardImpl().get_name()
                    }
                }
            },
            get__filters: function() {
                return this.$H
            },
            set__filters: function(e) {
                this.$H = e
            },
            $s: function(e, cj, ck) {
                if (!L.isNullOrEmpty(e) && !L.isNullOrEmpty(cj)) {
                    throw J.createInternalError('Only fieldName OR fieldCaption is allowed, not both.')
                }
                ck = ck || new Object;
                var cl = new tab._Deferred;
                var cm = {};
                this.$d(cm);
                if (!L.isNullOrEmpty(cj) && L.isNullOrEmpty(e)) {
                    cm['api.fieldCaption'] = cj
                }
                if (!L.isNullOrEmpty(e)) {
                    cm['api.fieldName'] = e
                }
                cm['api.filterHierarchicalLevels'] = 0;
                cm['api.ignoreDomain'] = ck.ignoreDomain || false;
                var cn = new(ss.makeGenericType(bj, [Object]))('api.GetOneFilterInfoCommand', 0, ss.mkdel(this, function(co) {
                    var cp = P.$2(co);
                    if (ss.isNullOrUndefined(cp)) {
                        var cq = co;
                        var cr = bR.$0(this, cq);
                        cl.resolve(cr)
                    } else {
                        cl.reject(cp)
                    }
                }), function(co, cp) {
                    cl.reject(J.createServerError(cp))
                });
                this.sendCommand(Object).call(this, cm, cn);
                return cl.get_promise()
            },
            $t: function(e) {
                this.$G();
                e = e || new Object;
                var cj = new tab._Deferred;
                var ck = {};
                this.$d(ck);
                ck['api.ignoreDomain'] = e.ignoreDomain || false;
                var cl = new(ss.makeGenericType(bj, [Object]))('api.GetFiltersListCommand', 0, ss.mkdel(this, function(cm) {
                    this.set__filters(bR.processFiltersList(this, cm));
                    cj.resolve(this.get__filters()._toApiCollection())
                }), function(cm, cn) {
                    cj.reject(J.createServerError(cn))
                });
                this.sendCommand(Object).call(this, ck, cl);
                return cj.get_promise()
            },
            $e: function(e, cj, ck, cl) {
                return this.$f(e, cj, ck, cl)
            },
            $m: function(e) {
                return this.$n(e)
            },
            $i: function(e, cj) {
                var ck = P.$3(cj);
                return this.$j(e, ck)
            },
            $k: function(e, cj) {
                var ck = P.$4(cj);
                return this.$l(e, ck)
            },
            $g: function(e, cj, ck, cl) {
                if (ss.isNullOrUndefined(cj) && ck !== 'all') {
                    throw J.createInvalidParameter('values')
                }
                return this.$h(e, cj, ck, cl)
            },
            $n: function(e) {
                this.$G();
                if (L.isNullOrEmpty(e)) {
                    throw J.createNullOrEmptyParameter('fieldName')
                }
                var cj = new tab._Deferred;
                var ck = {};
                ck['api.fieldCaption'] = e;
                this.$d(ck);
                var cl = P.$0('api.ClearFilterCommand', e, cj);
                this.sendCommand(Object).call(this, ck, cl);
                return cj.get_promise()
            },
            $f: function(e, cj, ck, cl) {
                this.$G();
                if (L.isNullOrEmpty(e)) {
                    throw J.createNullOrEmptyParameter('fieldName')
                }
                ck = n.$1(Y).call(null, ck, 'updateType');
                var cm = [];
                if (A.isArray(cj)) {
                    for (var cn = 0; cn < cj.length; cn++) {
                        cm.push(cj[cn].toString())
                    }
                } else if (ss.isValue(cj)) {
                    cm.push(cj.toString())
                }
                var co = new tab._Deferred;
                var cp = {};
                cp['api.fieldCaption'] = e;
                cp['api.filterUpdateType'] = ck;
                cp['api.exclude'] = ((ss.isValue(cl) && cl.isExcludeMode) ? true : false);
                if (ck !== 'all') {
                    cp['api.filterCategoricalValues'] = cm
                }
                this.$d(cp);
                var cq = P.$0('api.ApplyCategoricalFilterCommand', e, co);
                this.sendCommand(Object).call(this, cp, cq);
                return co.get_promise()
            },
            $j: function(e, cj) {
                this.$G();
                if (L.isNullOrEmpty(e)) {
                    throw J.createNullOrEmptyParameter('fieldName')
                }
                if (ss.isNullOrUndefined(cj)) {
                    throw J.createNullOrEmptyParameter('filterOptions')
                }
                var ck = {};
                ck['api.fieldCaption'] = e;
                if (ss.isValue(cj.min)) {
                    if (L.isDate(cj.min)) {
                        var cl = cj.min;
                        if (L.isDateValid(cl)) {
                            ck['api.filterRangeMin'] = L.serializeDateForServer(cl)
                        } else {
                            throw J.createInvalidDateParameter('filterOptions.min')
                        }
                    } else {
                        ck['api.filterRangeMin'] = cj.min
                    }
                }
                if (ss.isValue(cj.max)) {
                    if (L.isDate(cj.max)) {
                        var cm = cj.max;
                        if (L.isDateValid(cm)) {
                            ck['api.filterRangeMax'] = L.serializeDateForServer(cm)
                        } else {
                            throw J.createInvalidDateParameter('filterOptions.max')
                        }
                    } else {
                        ck['api.filterRangeMax'] = cj.max
                    }
                }
                if (ss.isValue(cj.nullOption)) {
                    ck['api.filterRangeNullOption'] = cj.nullOption
                }
                this.$d(ck);
                var cn = new tab._Deferred;
                var co = P.$0('api.ApplyRangeFilterCommand', e, cn);
                this.sendCommand(Object).call(this, ck, co);
                return cn.get_promise()
            },
            $l: function(e, cj) {
                this.$G();
                if (L.isNullOrEmpty(e)) {
                    throw J.createInvalidParameter('fieldName')
                } else if (ss.isNullOrUndefined(cj)) {
                    throw J.createInvalidParameter('filterOptions')
                }
                var ck = {};
                ck['api.fieldCaption'] = e;
                if (ss.isValue(cj)) {
                    ck['api.filterPeriodType'] = cj.periodType;
                    ck['api.filterDateRangeType'] = cj.rangeType;
                    if (cj.rangeType === 'lastn' || cj.rangeType === 'nextn') {
                        if (ss.isNullOrUndefined(cj.rangeN)) {
                            throw J.create('missingRangeNForRelativeDateFilters', 'Missing rangeN field for a relative date filter of LASTN or NEXTN.')
                        }
                        ck['api.filterDateRange'] = cj.rangeN
                    }
                    if (ss.isValue(cj.anchorDate)) {
                        ck['api.filterDateArchorValue'] = L.serializeDateForServer(cj.anchorDate)
                    }
                }
                this.$d(ck);
                var cl = new tab._Deferred;
                var cm = P.$0('api.ApplyRelativeDateFilterCommand', e, cl);
                this.sendCommand(Object).call(this, ck, cm);
                return cl.get_promise()
            },
            $h: function(e, cj, ck, cl) {
                this.$G();
                if (L.isNullOrEmpty(e)) {
                    throw J.createNullOrEmptyParameter('fieldName')
                }
                ck = n.$1(Y).call(null, ck, 'updateType');
                var cm = null;
                var cn = null;
                if (A.isArray(cj)) {
                    cm = [];
                    var co = cj;
                    for (var cp = 0; cp < co.length; cp++) {
                        cm.push(co[cp].toString())
                    }
                } else if (L.isString(cj)) {
                    cm = [];
                    cm.push(cj.toString())
                } else if (ss.isValue(cj) && ss.isValue(cj['levels'])) {
                    var cq = cj['levels'];
                    cn = [];
                    if (A.isArray(cq)) {
                        var cr = cq;
                        for (var cs = 0; cs < cr.length; cs++) {
                            cn.push(cr[cs].toString())
                        }
                    } else {
                        cn.push(cq.toString())
                    }
                } else if (ss.isValue(cj)) {
                    throw J.createInvalidParameter('values')
                }
                var ct = {};
                ct['api.fieldCaption'] = e;
                ct['api.filterUpdateType'] = ck;
                ct['api.exclude'] = ((ss.isValue(cl) && cl.isExcludeMode) ? true : false);
                if (ss.isValue(cm)) {
                    ct['api.filterHierarchicalValues'] = JSON.stringify(cm)
                }
                if (ss.isValue(cn)) {
                    ct['api.filterHierarchicalLevels'] = JSON.stringify(cn)
                }
                this.$d(ct);
                var cu = new tab._Deferred;
                var cv = P.$0('api.ApplyHierarchicalFilterCommand', e, cu);
                this.sendCommand(Object).call(this, ct, cv);
                return cu.get_promise()
            },
            get_selectedMarks: function() {
                return this.$J
            },
            set_selectedMarks: function(e) {
                this.$J = e
            },
            $p: function() {
                this.$G();
                var e = new tab._Deferred;
                var cj = {};
                this.$d(cj);
                var ck = new(ss.makeGenericType(bj, [Object]))('api.ClearSelectedMarksCommand', 1, function(cl) {
                    e.resolve()
                }, function(cl, cm) {
                    e.reject(J.createServerError(cm))
                });
                this.sendCommand(Object).call(this, cj, ck);
                return e.get_promise()
            },
            $B: function(e, cj, ck) {
                this.$G();
                if (ss.isNullOrUndefined(e) && ss.isNullOrUndefined(cj)) {
                    return this.$p()
                }
                if (L.isString(e) && (A.isArray(cj) || L.isString(cj) || !n.$0(bd).call(null, cj))) {
                    return this.$C(e, cj, ck)
                } else if (A.isArray(e)) {
                    return this.$D(e, cj)
                } else {
                    return this.$E(e, cj)
                }
            },
            $v: function() {
                this.$G();
                var e = new tab._Deferred;
                var cj = {};
                this.$d(cj);
                var ck = new(ss.makeGenericType(bj, [Object]))('api.FetchSelectedMarksCommand', 0, ss.mkdel(this, function(cl) {
                    this.$J = l.$0(cl);
                    e.resolve(this.$J._toApiCollection())
                }), function(cl, cm) {
                    e.reject(J.createServerError(cm))
                });
                this.sendCommand(Object).call(this, cj, ck);
                return e.get_promise()
            },
            $C: function(e, cj, ck) {
                var cl = [];
                var cm = [];
                var cn = [];
                var co = [];
                var cp = [];
                var cq = [];
                this.$A(cl, cm, cn, co, cp, cq, e, cj);
                return this.$F(null, cl, cm, cn, co, cp, cq, ck)
            },
            $E: function(e, cj) {
                var ck = e;
                var cl = [];
                var cm = [];
                var cn = [];
                var co = [];
                var cp = [];
                var cq = [];
                var cr = new ss.ObjectEnumerator(ck);
                try {
                    while (cr.moveNext()) {
                        var cs = cr.current();
                        if (e.hasOwnProperty(cs.key)) {
                            if (!A.isFunction(ck[cs.key])) {
                                this.$A(cl, cm, cn, co, cp, cq, cs.key, cs.value)
                            }
                        }
                    }
                } finally {
                    cr.dispose()
                }
                return this.$F(null, cl, cm, cn, co, cp, cq, cj)
            },
            $D: function(e, cj) {
                var ck = [];
                var cl = [];
                var cm = [];
                var cn = [];
                var co = [];
                var cp = [];
                var cq = [];
                for (var cr = 0; cr < e.length; cr++) {
                    var cs = e[cr];
                    if (ss.isValue(cs.$0.$3()) && cs.$0.$3() > 0) {
                        cq.push(cs.$0.$3())
                    } else {
                        var ct = cs.$0.$2();
                        for (var cu = 0; cu < ct.get__length(); cu++) {
                            var cv = ct.get_item(cu);
                            if (cv.hasOwnProperty('fieldName') && cv.hasOwnProperty('value') && !A.isFunction(cv.fieldName) && !A.isFunction(cv.value)) {
                                this.$A(ck, cl, cm, cn, co, cp, cv.fieldName, cv.value)
                            }
                        }
                    }
                }
                return this.$F(cq, ck, cl, cm, cn, co, cp, cj)
            },
            $A: function(e, cj, ck, cl, cm, cn, co, cp) {
                var cq = cp;
                if (P.$5.test(co)) {
                    this.$c(ck, cl, co, cp)
                } else if (ss.isValue(cq.min) || ss.isValue(cq.max)) {
                    var cr = new Object;
                    if (ss.isValue(cq.min)) {
                        if (L.isDate(cq.min)) {
                            var cs = cq.min;
                            if (L.isDateValid(cs)) {
                                cr.min = L.serializeDateForServer(cs)
                            } else {
                                throw J.createInvalidDateParameter('options.min')
                            }
                        } else {
                            cr.min = cq.min
                        }
                    }
                    if (ss.isValue(cq.max)) {
                        if (L.isDate(cq.max)) {
                            var ct = cq.max;
                            if (L.isDateValid(ct)) {
                                cr.max = L.serializeDateForServer(ct)
                            } else {
                                throw J.createInvalidDateParameter('options.max')
                            }
                        } else {
                            cr.max = cq.max
                        }
                    }
                    if (ss.isValue(cq.nullOption)) {
                        var cu = n.$1(Z).call(null, cq.nullOption, 'options.nullOption');
                        cr.nullOption = cu
                    } else {
                        cr.nullOption = 'allValues'
                    }
                    var cv = JSON.stringify(cr);
                    this.$c(cm, cn, co, cv)
                } else {
                    this.$c(e, cj, co, cp)
                }
            },
            $c: function(e, cj, ck, cl) {
                var cm = [];
                if (A.isArray(cl)) {
                    var cn = cl;
                    for (var co = 0; co < cn.length; co++) {
                        cm.push(cn[co].toString())
                    }
                } else {
                    cm.push(cl.toString())
                }
                cj.push(cm);
                e.push(ck)
            },
            $F: function(e, cj, ck, cl, cm, cn, co, cp) {
                var cq = {};
                this.$d(cq);
                cp = n.$1(bd).call(null, cp, 'updateType');
                cq['api.filterUpdateType'] = cp;
                if (!L.isNullOrEmpty(e)) {
                    cq['api.tupleIds'] = JSON.stringify(e)
                }
                if (!L.isNullOrEmpty(cj) && !L.isNullOrEmpty(ck)) {
                    cq['api.categoricalFieldCaption'] = JSON.stringify(cj);
                    var cr = [];
                    for (var cs = 0; cs < ck.length; cs++) {
                        var ct = JSON.stringify(ck[cs]);
                        cr.push(ct)
                    }
                    cq['api.categoricalMarkValues'] = JSON.stringify(cr)
                }
                if (!L.isNullOrEmpty(cl) && !L.isNullOrEmpty(cm)) {
                    cq['api.hierarchicalFieldCaption'] = JSON.stringify(cl);
                    var cu = [];
                    for (var cv = 0; cv < cm.length; cv++) {
                        var cw = JSON.stringify(cm[cv]);
                        cu.push(cw)
                    }
                    cq['api.hierarchicalMarkValues'] = JSON.stringify(cu)
                }
                if (!L.isNullOrEmpty(cn) && !L.isNullOrEmpty(co)) {
                    cq['api.rangeFieldCaption'] = JSON.stringify(cn);
                    var cx = [];
                    for (var cy = 0; cy < co.length; cy++) {
                        var cz = JSON.stringify(co[cy]);
                        cx.push(cz)
                    }
                    cq['api.rangeMarkValues'] = JSON.stringify(cx)
                }
                if (L.isNullOrEmpty(cq['api.tupleIds']) && L.isNullOrEmpty(cq['api.categoricalFieldCaption']) && L.isNullOrEmpty(cq['api.hierarchicalFieldCaption']) && L.isNullOrEmpty(cq['api.rangeFieldCaption'])) {
                    throw J.createInvalidParameter('fieldNameOrFieldValuesMap')
                }
                var cA = new tab._Deferred;
                var cB = new(ss.makeGenericType(bj, [Object]))('api.SelectMarksCommand', 1, function(cC) {
                    var cD = P.$1(cC);
                    if (ss.isNullOrUndefined(cD)) {
                        cA.resolve()
                    } else {
                        cA.reject(cD)
                    }
                }, function(cC, cD) {
                    cA.reject(J.createServerError(cD))
                });
                this.sendCommand(Object).call(this, cq, cB);
                return cA.get_promise()
            },
            $w: function(e) {
                this.$G();
                var cj = new tab._Deferred;
                var ck = {};
                this.$d(ck);
                e = e || new Object;
                ck['api.ignoreAliases'] = ss.coalesce(e.ignoreAliases, false);
                ck['api.ignoreSelection'] = ss.coalesce(e.ignoreSelection, false);
                ck['api.maxRows'] = ss.coalesce(e.maxRows, 0);
                var cl = new(ss.makeGenericType(bj, [Object]))('api.GetSummaryTableCommand', 0, function(cm) {
                    var cn = cm;
                    var co = y.processGetDataPresModel(cn);
                    cj.resolve(co)
                }, function(cm, cn) {
                    cj.reject(J.createServerError(cn))
                });
                this.sendCommand(Object).call(this, ck, cl);
                return cj.get_promise()
            },
            $x: function(e) {
                this.$G();
                var cj = new tab._Deferred;
                var ck = {};
                this.$d(ck);
                e = e || new Object;
                ck['api.ignoreAliases'] = ss.coalesce(e.ignoreAliases, false);
                ck['api.ignoreSelection'] = ss.coalesce(e.ignoreSelection, false);
                ck['api.includeAllColumns'] = ss.coalesce(e.includeAllColumns, false);
                ck['api.maxRows'] = ss.coalesce(e.maxRows, 0);
                var cl = new(ss.makeGenericType(bj, [Object]))('api.GetUnderlyingTableCommand', 0, function(cm) {
                    var cn = cm;
                    var co = y.processGetDataPresModel(cn);
                    cj.resolve(co)
                }, function(cm, cn) {
                    cj.reject(J.createServerError(cn))
                });
                this.sendCommand(Object).call(this, ck, cl);
                return cj.get_promise()
            },
            $o: function() {
                this.$G();
                var e = new tab._Deferred;
                var cj = {};
                this.$d(cj);
                var ck = new(ss.makeGenericType(bj, [Object]))('api.ClearHighlightedMarksCommand', 1, function(cl) {
                    e.resolve()
                }, function(cl, cm) {
                    e.reject(J.createServerError(cm))
                });
                this.sendCommand(Object).call(this, cj, ck);
                return e.get_promise()
            },
            $y: function(e, cj) {
                B.verifyString(e, 'fieldName');
                this.$G();
                var ck = new tab._Deferred;
                var cl = {};
                cl['api.fieldCaption'] = e;
                cl['api.ObjectTextIDs'] = cj;
                this.$d(cl);
                var cm = new(ss.makeGenericType(bj, [Object]))('api.HighlightMarksCommand', 0, function(cn) {
                    ck.resolve()
                }, function(cn, co) {
                    ck.reject(J.createServerError(co))
                });
                this.sendCommand(Object).call(this, cl, cm);
                return ck.get_promise()
            },
            $z: function(e, cj) {
                B.verifyString(e, 'fieldName');
                B.verifyString(cj, 'patternMatch');
                this.$G();
                var ck = new tab._Deferred;
                var cl = {};
                cl['api.filterUpdateType'] = 'replace';
                cl['api.fieldCaption'] = e;
                cl['api.Pattern'] = cj;
                this.$d(cl);
                var cm = new(ss.makeGenericType(bj, [Object]))('api.HighlightMarksByPatternMatch', 0, function(cn) {
                    ck.resolve()
                }, function(cn, co) {
                    ck.reject(J.createServerError(co))
                });
                this.sendCommand(Object).call(this, cl, cm);
                return ck.get_promise()
            },
            $u: function() {
                this.$G();
                var e = new tab._Deferred;
                var cj = {};
                this.$d(cj);
                var ck = new(ss.makeGenericType(bj, [Object]))('api.FetchHighlightedMarksCommand', 0, ss.mkdel(this, function(cl) {
                    this.highlightedMarks = l.$0(cl);
                    e.resolve(this.highlightedMarks._toApiCollection())
                }), function(cl, cm) {
                    e.reject(J.createServerError(cm))
                });
                this.sendCommand(Object).call(this, cj, ck);
                return e.get_promise()
            }
        }, E);
        ss.initEnum(Q, a, {
            blank: 'blank',
            worksheet: 'worksheet',
            quickFilter: 'quickFilter',
            parameterControl: 'parameterControl',
            pageFilter: 'pageFilter',
            legend: 'legend',
            title: 'title',
            text: 'text',
            image: 'image',
            webPage: 'webPage'
        }, true);
        ss.initEnum(R, a, {
            last: 'last',
            lastn: 'lastn',
            next: 'next',
            nextn: 'nextn',
            curr: 'curr',
            todate: 'todate'
        }, true);
        ss.initEnum(S, a, {
            default: 'default',
            desktop: 'desktop',
            tablet: 'tablet',
            phone: 'phone'
        }, true);
        ss.initClass(T, a, {});
        ss.initEnum(U, a, {
            internalError: 'internalError',
            serverError: 'serverError',
            invalidAggregationFieldName: 'invalidAggregationFieldName',
            invalidToolbarButtonName: 'invalidToolbarButtonName',
            invalidParameter: 'invalidParameter',
            invalidUrl: 'invalidUrl',
            staleDataReference: 'staleDataReference',
            vizAlreadyInManager: 'vizAlreadyInManager',
            noUrlOrParentElementNotFound: 'noUrlOrParentElementNotFound',
            invalidFilterFieldName: 'invalidFilterFieldName',
            invalidFilterFieldValue: 'invalidFilterFieldValue',
            invalidFilterFieldNameOrValue: 'invalidFilterFieldNameOrValue',
            filterCannotBePerformed: 'filterCannotBePerformed',
            notActiveSheet: 'notActiveSheet',
            invalidCustomViewName: 'invalidCustomViewName',
            missingRangeNForRelativeDateFilters: 'missingRangeNForRelativeDateFilters',
            missingMaxSize: 'missingMaxSize',
            missingMinSize: 'missingMinSize',
            missingMinMaxSize: 'missingMinMaxSize',
            invalidSize: 'invalidSize',
            invalidSizeBehaviorOnWorksheet: 'invalidSizeBehaviorOnWorksheet',
            sheetNotInWorkbook: 'sheetNotInWorkbook',
            indexOutOfRange: 'indexOutOfRange',
            downloadWorkbookNotAllowed: 'downloadWorkbookNotAllowed',
            nullOrEmptyParameter: 'nullOrEmptyParameter',
            browserNotCapable: 'browserNotCapable',
            unsupportedEventName: 'unsupportedEventName',
            invalidDateParameter: 'invalidDateParameter',
            invalidSelectionFieldName: 'invalidSelectionFieldName',
            invalidSelectionValue: 'invalidSelectionValue',
            invalidSelectionDate: 'invalidSelectionDate',
            noUrlForHiddenWorksheet: 'noUrlForHiddenWorksheet',
            maxVizResizeAttempts: 'maxVizResizeAttempts'
        }, true);
        ss.initEnum(V, a, {
            SUM: 'SUM',
            AVG: 'AVG',
            MIN: 'MIN',
            MAX: 'MAX',
            STDEV: 'STDEV',
            STDEVP: 'STDEVP',
            VAR: 'VAR',
            VARP: 'VARP',
            COUNT: 'COUNT',
            COUNTD: 'COUNTD',
            MEDIAN: 'MEDIAN',
            ATTR: 'ATTR',
            NONE: 'NONE',
            PERCENTILE: 'PERCENTILE',
            YEAR: 'YEAR',
            QTR: 'QTR',
            MONTH: 'MONTH',
            DAY: 'DAY',
            HOUR: 'HOUR',
            MINUTE: 'MINUTE',
            SECOND: 'SECOND',
            WEEK: 'WEEK',
            WEEKDAY: 'WEEKDAY',
            MONTHYEAR: 'MONTHYEAR',
            MDY: 'MDY',
            END: 'END',
            TRUNC_YEAR: 'TRUNC_YEAR',
            TRUNC_QTR: 'TRUNC_QTR',
            TRUNC_MONTH: 'TRUNC_MONTH',
            TRUNC_WEEK: 'TRUNC_WEEK',
            TRUNC_DAY: 'TRUNC_DAY',
            TRUNC_HOUR: 'TRUNC_HOUR',
            TRUNC_MINUTE: 'TRUNC_MINUTE',
            TRUNC_SECOND: 'TRUNC_SECOND',
            QUART1: 'QUART1',
            QUART3: 'QUART3',
            SKEWNESS: 'SKEWNESS',
            KURTOSIS: 'KURTOSIS',
            INOUT: 'INOUT',
            SUM_XSQR: 'SUM_XSQR',
            USER: 'USER'
        }, true);
        ss.initEnum(W, a, {
            dimension: 'dimension',
            measure: 'measure',
            unknown: 'unknown'
        }, true);
        ss.initEnum(X, a, {
            categorical: 'categorical',
            quantitative: 'quantitative',
            hierarchical: 'hierarchical',
            relativedate: 'relativedate'
        }, true);
        ss.initEnum(Y, a, {
            all: 'all',
            replace: 'replace',
            add: 'add',
            remove: 'remove'
        }, true);
        ss.initEnum(Z, a, {
            nullValues: 'nullValues',
            nonNullValues: 'nonNullValues',
            allValues: 'allValues'
        }, true);
        ss.initEnum(ba, a, {
            all: 'all',
            list: 'list',
            range: 'range'
        }, true);
        ss.initEnum(bb, a, {
            float: 'float',
            integer: 'integer',
            string: 'string',
            boolean: 'boolean',
            date: 'date',
            datetime: 'datetime'
        }, true);
        ss.initEnum(bc, a, {
            year: 'year',
            quarter: 'quarter',
            month: 'month',
            week: 'week',
            day: 'day',
            hour: 'hour',
            minute: 'minute',
            second: 'second'
        }, true);
        ss.initEnum(bd, a, {
            replace: 'replace',
            add: 'add',
            remove: 'remove'
        }, true);
        ss.initEnum(be, a, {
            automatic: 'automatic',
            exactly: 'exactly',
            range: 'range',
            atleast: 'atleast',
            atmost: 'atmost'
        }, true);
        ss.initEnum(bf, a, {
            worksheet: 'worksheet',
            dashboard: 'dashboard',
            story: 'story'
        }, true);
        ss.initEnum(bg, a, {
            customviewload: 'customviewload',
            customviewremove: 'customviewremove',
            customviewsave: 'customviewsave',
            customviewsetdefault: 'customviewsetdefault',
            filterchange: 'filterchange',
            firstinteractive: 'firstinteractive',
            firstvizsizeknown: 'firstvizsizeknown',
            marksselection: 'marksselection',
            markshighlight: 'markshighlight',
            parametervaluechange: 'parametervaluechange',
            storypointswitch: 'storypointswitch',
            tabswitch: 'tabswitch',
            toolbarstatechange: 'toolbarstatechange',
            vizresize: 'vizresize'
        }, true);
        ss.initEnum(bh, a, {
            redo: 'redo',
            undo: 'undo'
        }, true);
        ss.initEnum(bi, a, {
            top: 'top',
            bottom: 'bottom'
        }, true);
        ss.initClass(bk, a, {
            get_router: function() {
                return this.$1
            },
            get_handler: function() {
                return this.$0
            },
            sendCommand: function(e) {
                return function(cj, ck) {
                    this.$1.sendCommand(e).call(this.$1, this.$0, cj, ck)
                }
            }
        });
        ss.initClass(bC, a, {
            getViz: function() {
                return this.$1
            },
            getEventName: function() {
                return this.$0
            }
        });
        ss.initClass(bl, a, {
            getCustomViewAsync: function() {
                var e = new tab._Deferred;
                var cj = null;
                if (ss.isValue(this.$2.get__customViewImpl())) {
                    cj = this.$2.get__customViewImpl().$5()
                }
                e.resolve(cj);
                return e.get_promise()
            }
        }, bC);
        ss.initEnum(bm, a, {
            float: 'float',
            integer: 'integer',
            string: 'string',
            boolean: 'boolean',
            date: 'date',
            datetime: 'datetime'
        }, true);
        ss.initClass(bn, a, {}, Object);
        ss.initClass(bI, a, {
            getWorksheet: function() {
                return this.$2.get_worksheet()
            }
        }, bC);
        ss.initClass(bp, a, {
            getFieldName: function() {
                return this.$4
            },
            getFilterAsync: function() {
                return this.$3.get__worksheetImpl().$s(this.$3.get__filterFieldName(), null, null)
            }
        }, bI);
        ss.initClass(bq, a, {
            getVizSize: function() {
                return this.$2
            }
        }, bC);
        ss.initClass(br, a, {
            getHighlightedMarksAsync: function() {
                var e = this.$3.get__worksheetImpl();
                return e.$u()
            }
        }, bI);
        ss.initClass(bu, a, {
            getMarksAsync: function() {
                var e = this.$3.get__worksheetImpl();
                if (ss.isValue(e.get_selectedMarks())) {
                    var cj = new tab._Deferred;
                    return cj.resolve(e.get_selectedMarks()._toApiCollection())
                }
                return e.$v()
            }
        }, bI);
        ss.initClass(bv, a, {
            getParameterName: function() {
                return this.$2.get__parameterName()
            },
            getParameterAsync: function() {
                return this.$2.get__workbookImpl().$8(this.$2.get__parameterName())
            }
        }, bC);
        ss.initClass(bw, a, {}, Object);
        ss.initClass(bx, a, {}, Object);
        ss.initClass(by, a, {});
        ss.initClass(bz, a, {}, Object);
        ss.initClass(bA, a, {});
        ss.initClass(bB, a, {
            getOldStoryPointInfo: function() {
                return this.$3
            },
            getNewStoryPoint: function() {
                return this.$2
            }
        }, bC);
        ss.initClass(bD, a, {
            getOldSheetName: function() {
                return this.$3
            },
            getNewSheetName: function() {
                return this.$2
            }
        }, bC);
        ss.initClass(bE, a, {
            getToolbarState: function() {
                return this.$2.get_toolbarState()
            }
        }, bC);
        ss.initClass(bF, a, {
            add_customViewsListLoad: function(e) {
                this.$1$1 = ss.delegateCombine(this.$1$1, e)
            },
            remove_customViewsListLoad: function(e) {
                this.$1$1 = ss.delegateRemove(this.$1$1, e)
            },
            add_stateReadyForQuery: function(e) {
                this.$1$2 = ss.delegateCombine(this.$1$2, e)
            },
            remove_stateReadyForQuery: function(e) {
                this.$1$2 = ss.delegateRemove(this.$1$2, e)
            },
            $1F: function(e) {
                this.$1$3 = ss.delegateCombine(this.$1$3, e)
            },
            $1G: function(e) {
                this.$1$3 = ss.delegateRemove(this.$1$3, e)
            },
            $1D: function(e) {
                this.$1$4 = ss.delegateCombine(this.$1$4, e)
            },
            $1E: function(e) {
                this.$1$4 = ss.delegateRemove(this.$1$4, e)
            },
            $1B: function(e) {
                this.$1$5 = ss.delegateCombine(this.$1$5, e)
            },
            $1C: function(e) {
                this.$1$5 = ss.delegateRemove(this.$1$5, e)
            },
            $1H: function(e) {
                this.$1$6 = ss.delegateCombine(this.$1$6, e)
            },
            $1I: function(e) {
                this.$1$6 = ss.delegateRemove(this.$1$6, e)
            },
            $1t: function(e) {
                this.$1$7 = ss.delegateCombine(this.$1$7, e)
            },
            $1u: function(e) {
                this.$1$7 = ss.delegateRemove(this.$1$7, e)
            },
            $1x: function(e) {
                this.$1$8 = ss.delegateCombine(this.$1$8, e)
            },
            $1y: function(e) {
                this.$1$8 = ss.delegateRemove(this.$1$8, e)
            },
            $1v: function(e) {
                this.$1$9 = ss.delegateCombine(this.$1$9, e)
            },
            $1w: function(e) {
                this.$1$9 = ss.delegateRemove(this.$1$9, e)
            },
            $1z: function(e) {
                this.$1$10 = ss.delegateCombine(this.$1$10, e)
            },
            $1A: function(e) {
                this.$1$10 = ss.delegateRemove(this.$1$10, e)
            },
            $1L: function(e) {
                this.$1$11 = ss.delegateCombine(this.$1$11, e)
            },
            $1M: function(e) {
                this.$1$11 = ss.delegateRemove(this.$1$11, e)
            },
            $1N: function(e) {
                this.$1$12 = ss.delegateCombine(this.$1$12, e)
            },
            $1O: function(e) {
                this.$1$12 = ss.delegateRemove(this.$1$12, e)
            },
            $1J: function(e) {
                this.$1$13 = ss.delegateCombine(this.$1$13, e)
            },
            $1K: function(e) {
                this.$1$13 = ss.delegateRemove(this.$1$13, e)
            },
            $1P: function(e) {
                this.$1$14 = ss.delegateCombine(this.$1$14, e)
            },
            $1Q: function(e) {
                this.$1$14 = ss.delegateRemove(this.$1$14, e)
            },
            get_hostId: function() {
                return this.$1n.hostId
            },
            set_hostId: function(e) {
                this.$1n.hostId = e
            },
            get_iframe: function() {
                return this.$1e
            },
            get_instanceId: function() {
                return this.$1h
            },
            set_instanceId: function(e) {
                this.$1h = e
            },
            $18: function() {
                return this.$1p
            },
            $13: function() {
                return this.$1d
            },
            $15: function() {
                return this.$1i
            },
            $14: function() {
                return this.$1e.style.display === 'none'
            },
            $16: function() {
                return this.$1n.parentElement
            },
            $17: function() {
                return this.$1n.get_baseUrl()
            },
            $1a: function() {
                return this.$1s.get_workbook()
            },
            get__workbookImpl: function() {
                return this.$1s
            },
            $12: function() {
                return this.$1c
            },
            $19: function() {
                return this.$1q
            },
            getCurrentUrlAsync: function() {
                var e = new tab._Deferred;
                var cj = new(ss.makeGenericType(bj, [String]))('api.GetCurrentUrlCommand', 0, function(ck) {
                    e.resolve(ck)
                }, function(ck, cl) {
                    e.reject(J.createInternalError(cl))
                });
                this._sendCommand(String).call(this, null, cj);
                return e.get_promise()
            },
            handleVizListening: function() {
                this.$8()
            },
            handleVizLoad: function() {
                if (ss.isNullOrUndefined(this.$1q)) {
                    this.$Q(this.$1f.width + 'px', this.$1f.height + 'px');
                    this.$S()
                }
                if (ss.isValue(this.$1o)) {
                    this.$1o.style.display = 'none'
                }
                if (ss.isNullOrUndefined(this.$1s)) {
                    this.$1s = new O(this, this.$1j, ss.mkdel(this, function() {
                        this.$x(null)
                    }))
                } else if (!this.$1g) {
                    this.$1s._update(ss.mkdel(this, function() {
                        this.$x(null)
                    }))
                }
            },
            $1: function(e) {
                var cj = this.$1q.chromeHeight;
                var ck = this.$1q.sheetSize;
                var cl = 0;
                var cm = 0;
                if (ck.behavior === 'exactly') {
                    cl = ck.maxSize.width;
                    cm = ck.maxSize.height + cj
                } else {
                    var cn;
                    var co;
                    var cp;
                    var cq;
                    switch (ck.behavior) {
                        case 'range':
                            {
                                cn = ck.minSize.width;co = ck.maxSize.width;cp = ck.minSize.height + cj;cq = ck.maxSize.height + cj;cl = Math.max(cn, Math.min(co, e.width));cm = Math.max(cp, Math.min(cq, e.height));
                                break
                            }
                        case 'atleast':
                            {
                                cn = ck.minSize.width;cp = ck.minSize.height + cj;cl = Math.max(cn, e.width);cm = Math.max(cp, e.height);
                                break
                            }
                        case 'atmost':
                            {
                                co = ck.maxSize.width;cq = ck.maxSize.height + cj;cl = Math.min(co, e.width);cm = Math.min(cq, e.height);
                                break
                            }
                        case 'automatic':
                            {
                                cl = e.width;cm = Math.max(e.height, cj);
                                break
                            }
                        default:
                            {
                                throw J.createInternalError('Unknown SheetSizeBehavior for viz: ' + ck.behavior.toString())
                            }
                    }
                }
                return bz.$ctor(cl, cm)
            },
            $b: function() {
                var e;
                if (ss.isValue(this.$1f)) {
                    e = this.$1f;
                    this.$1f = null
                } else {
                    e = L.computeContentSize(this.$16())
                }
                this.$H(e);
                return this.$1(e)
            },
            $K: function() {
                if (!ss.isValue(this.$1q)) {
                    return
                }
                var e = this.$b();
                if (e.height === this.$1q.chromeHeight) {
                    return
                }
                this.$Q(e.width + 'px', e.height + 'px');
                var cj = 10;
                for (var ck = 0; ck < cj; ck++) {
                    var cl = this.$b();
                    if (ss.referenceEquals(JSON.stringify(e), JSON.stringify(cl))) {
                        return
                    }
                    e = cl;
                    this.$Q(e.width + 'px', e.height + 'px')
                }
                throw J.create('maxVizResizeAttempts', 'Viz resize limit hit. The calculated iframe size did not stabilize after ' + cj + ' resizes.')
            },
            handleEventNotification: function(e, cj) {
                var ck = r.deserialize(cj);
                switch (e) {
                    case 'api.FirstVizSizeKnownEvent':
                        {
                            this.$i(ck);
                            break
                        }
                    case 'api.VizInteractiveEvent':
                        {
                            this.$q(ck);
                            break
                        }
                    case 'api.MarksSelectionChangedEvent':
                        {
                            this.$l(ck);
                            break
                        }
                    case 'api.MarksHighlightChangedEvent':
                        {
                            this.$k(ck);
                            break
                        }
                    case 'api.FilterChangedEvent':
                        {
                            this.$h(ck);
                            break
                        }
                    case 'api.ParameterChangedEvent':
                        {
                            this.$m(ck);
                            break
                        }
                    case 'api.CustomViewsListLoadedEvent':
                        {
                            this.$g(ck);
                            break
                        }
                    case 'api.CustomViewUpdatedEvent':
                        {
                            this.$f(ck);
                            break
                        }
                    case 'api.CustomViewRemovedEvent':
                        {
                            this.$d();
                            break
                        }
                    case 'api.CustomViewSetDefaultEvent':
                        {
                            this.$e(ck);
                            break
                        }
                    case 'api.TabSwitchEvent':
                        {
                            this.$o(ck);
                            break
                        }
                    case 'api.ToolbarStateChangedEvent':
                        {
                            this.$p(ck);
                            break
                        }
                    case 'api.StorytellingStateChangedEvent':
                        {
                            this.$n(ck);
                            break
                        }
                }
            },
            addEventListener: function(e, cj) {
                var ck = {};
                if (!n.$2(bg).call(null, e, ck)) {
                    throw J.createUnsupportedEventName(e.toString())
                }
                switch (ck.$) {
                    case 'marksselection':
                        {
                            this.$1F(cj);
                            break
                        }
                    case 'markshighlight':
                        {
                            this.$1D(cj);
                            break
                        }
                    case 'parametervaluechange':
                        {
                            this.$1H(cj);
                            break
                        }
                    case 'filterchange':
                        {
                            this.$1B(cj);
                            break
                        }
                    case 'customviewload':
                        {
                            this.$1t(cj);
                            break
                        }
                    case 'customviewsave':
                        {
                            this.$1x(cj);
                            break
                        }
                    case 'customviewremove':
                        {
                            this.$1v(cj);
                            break
                        }
                    case 'customviewsetdefault':
                        {
                            this.$1z(cj);
                            break
                        }
                    case 'tabswitch':
                        {
                            this.$1L(cj);
                            break
                        }
                    case 'storypointswitch':
                        {
                            this.$1J(cj);
                            break
                        }
                    case 'toolbarstatechange':
                        {
                            this.$1N(cj);
                            break
                        }
                    case 'vizresize':
                        {
                            this.$1P(cj);
                            break
                        }
                }
            },
            removeEventListener: function(e, cj) {
                var ck = {};
                if (!n.$2(bg).call(null, e, ck)) {
                    throw J.createUnsupportedEventName(e.toString())
                }
                switch (ck.$) {
                    case 'marksselection':
                        {
                            this.$1G(cj);
                            break
                        }
                    case 'markshighlight':
                        {
                            this.$1E(cj);
                            break
                        }
                    case 'parametervaluechange':
                        {
                            this.$1I(cj);
                            break
                        }
                    case 'filterchange':
                        {
                            this.$1C(cj);
                            break
                        }
                    case 'customviewload':
                        {
                            this.$1u(cj);
                            break
                        }
                    case 'customviewsave':
                        {
                            this.$1y(cj);
                            break
                        }
                    case 'customviewremove':
                        {
                            this.$1w(cj);
                            break
                        }
                    case 'customviewsetdefault':
                        {
                            this.$1A(cj);
                            break
                        }
                    case 'tabswitch':
                        {
                            this.$1M(cj);
                            break
                        }
                    case 'toolbarstatechange':
                        {
                            this.$1O(cj);
                            break
                        }
                    case 'storypointswitch':
                        {
                            this.$1K(cj);
                            break
                        }
                    case 'vizresize':
                        {
                            this.$1Q(cj);
                            break
                        }
                }
            },
            $7: function() {
                if (ss.isValue(this.$1e)) {
                    this.$1e.parentNode.removeChild(this.$1e);
                    this.$1e = null
                }
                M.$2(this.$1p);
                this.$1j.get_router().unregisterHandler(this);
                this.$L()
            },
            $S: function() {
                this.$1e.style.display = 'block';
                this.$1e.style.visibility = 'visible'
            },
            $r: function() {
                this.$1e.style.display = 'none'
            },
            $u: function() {
                this.$1e.style.visibility = 'hidden'
            },
            $W: function() {
                this.$t('showExportImageDialog')
            },
            $V: function(e) {
                var cj = this.$11(e);
                this.$t('showExportDataDialog', cj)
            },
            $U: function(e) {
                var cj = this.$11(e);
                this.$t('showExportCrosstabDialog', cj)
            },
            $X: function() {
                this.$t('showExportPDFDialog')
            },
            $N: function() {
                return L.noResultPromiseHelper('api.RevertAllCommand', null, this.$1j)
            },
            $J: function() {
                return L.noResultPromiseHelper('api.RefreshDataCommand', null, this.$1j)
            },
            $Y: function() {
                this.$t('showShareDialog')
            },
            $T: function() {
                if (this.get__workbookImpl().get_isDownloadAllowed()) {
                    this.$t('showDownloadWorkbookDialog')
                } else {
                    throw J.create('downloadWorkbookNotAllowed', 'Download workbook is not allowed')
                }
            },
            $y: function() {
                return this.$s('pauseAutomaticUpdates')
            },
            $M: function() {
                return this.$s('resumeAutomaticUpdates')
            },
            $Z: function() {
                return this.$s('toggleAutomaticUpdates')
            },
            $R: function(e, cj) {
                this.$H(bz.$ctor(-1, -1));
                this.$Q(e, cj);
                this.$1s._updateActiveSheetAsync()
            },
            $P: function(e) {
                this.$1c = e
            },
            $3: function() {
                return this.$1n.parentElement
            },
            $4: function() {
                try {
                    M.$0(this.$1p)
                } catch (cj) {
                    var e = ss.Exception.wrap(cj);
                    this.$7();
                    throw e
                }
                if (!this.$1n.fixedSize) {
                    this.$1f = L.computeContentSize(this.$16());
                    if (this.$1f.width === 0 || this.$1f.height === 0) {
                        this.$1f = bz.$ctor(800, 600)
                    }
                    this.$1e = this.$5();
                    this.$u();
                    if (this.$1n.displayStaticImage) {
                        this.$1o = this.$6(this.$1f);
                        this.$1o.style.display = 'block'
                    }
                } else {
                    if (this.$1n.displayStaticImage) {
                        this.$1o = this.$6(bz.$ctor(parseInt(this.$1n.width), parseInt(this.$1n.height)));
                        this.$1o.style.display = 'block'
                    }
                    this.$1e = this.$5();
                    this.$S()
                }
                if (!L.hasWindowPostMessage()) {
                    if (L.isIE()) {
                        this.$1e['onreadystatechange'] = this.$c()
                    } else {
                        this.$1e.onload = this.$c()
                    }
                }
                this.$1i = !this.$1n.toolbar;
                this.$1d = !this.$1n.tabs;
                this.$1j.get_router().registerHandler(this);
                this.$1e.src = this.$1n.get_url()
            },
            $O: function() {
                try {
                    if (!L.hasWindowPostMessage() || ss.isNullOrUndefined(this.$1e) || !ss.isValue(this.$1e.contentWindow)) {
                        return
                    }
                } catch (cl) {
                    return
                }
                var e = L.visibleContentRectInDocumentCoordinates(this.get_iframe());
                var cj = L.contentRectInDocumentCoordinates(this.get_iframe());
                var ck = [];
                ck.push('layoutInfoResp'.toString());
                ck.push(e.left - cj.left);
                ck.push(e.top - cj.top);
                ck.push(e.width);
                ck.push(e.height);
                this.$1e.contentWindow.postMessage(ck.join(','), '*')
            },
            $8: function() {
                if (!L.hasWindowPostMessage() || ss.isNullOrUndefined(this.$1e) || !ss.isValue(this.$1e.contentWindow)) {
                    return
                }
                this.$1e.contentWindow.postMessage('tableau.enableVisibleRectCommunication'.toString(), '*')
            },
            $I: function() {
                return L.noResultPromiseHelper('api.Redo', null, this.$1j)
            },
            $10: function() {
                return L.noResultPromiseHelper('api.Undo', null, this.$1j)
            },
            _sendCommand: function(e) {
                return function(cj, ck) {
                    this.$1j.sendCommand(e).call(this.$1j, cj, ck)
                }
            },
            $E: function(e) {
                if (!ss.staticEquals(this.$1$6, null)) {
                    this.$1$6(new bv('parametervaluechange', this.$1p, e))
                }
            },
            $z: function(e) {
                this.get__workbookImpl()._update(ss.mkdel(this, function() {
                    if (!ss.staticEquals(this.$1$7, null)) {
                        this.$1$7(new bl('customviewload', this.$1p, (ss.isValue(e) ? e._impl : null)))
                    }
                }))
            },
            $B: function(e) {
                this.get__workbookImpl()._update(ss.mkdel(this, function() {
                    if (!ss.staticEquals(this.$1$8, null)) {
                        this.$1$8(new bl('customviewsave', this.$1p, e._impl))
                    }
                }))
            },
            $A: function(e) {
                if (!ss.staticEquals(this.$1$9, null)) {
                    this.$1$9(new bl('customviewremove', this.$1p, e._impl))
                }
            },
            $C: function(e) {
                if (!ss.staticEquals(this.$1$10, null)) {
                    this.$1$10(new bl('customviewsetdefault', this.$1p, e._impl))
                }
            },
            $G: function(e, cj) {
                if (!ss.staticEquals(this.$1$11, null)) {
                    this.$1$11(new bD('tabswitch', this.$1p, e, cj))
                }
            },
            raiseStoryPointSwitch: function(e, cj) {
                if (!ss.staticEquals(this.$1$13, null)) {
                    this.$1$13(new bB('storypointswitch', this.$1p, e, cj))
                }
            },
            $F: function() {
                if (!ss.staticEquals(this.$1$2, null)) {
                    this.$1$2(this)
                }
            },
            $D: function() {
                if (!ss.staticEquals(this.$1$1, null)) {
                    this.$1$1(this)
                }
            },
            $H: function(e) {
                if (!ss.staticEquals(this.$1$14, null)) {
                    this.$1$14(new bG('vizresize', this.$1p, e))
                }
            },
            $Q: function(e, cj) {
                this.$1n.width = e;
                this.$1n.height = cj;
                this.$1e.style.width = this.$1n.width;
                this.$1e.style.height = this.$1n.height
            },
            $11: function(e) {
                if (ss.isNullOrUndefined(e)) {
                    return null
                }
                var cj = this.$1s.$4(e);
                if (ss.isNullOrUndefined(cj)) {
                    throw J.createNotActiveSheet()
                }
                return cj.get_name()
            },
            $s: function(e) {
                if (e !== 'pauseAutomaticUpdates' && e !== 'resumeAutomaticUpdates' && e !== 'toggleAutomaticUpdates') {
                    throw J.createInternalError(null)
                }
                var cj = {};
                cj['api.invokeCommandName'] = e;
                var ck = new tab._Deferred;
                var cl = new(ss.makeGenericType(bj, [Object]))('api.InvokeCommandCommand', 0, ss.mkdel(this, function(cm) {
                    if (ss.isValue(cm) && ss.isValue(cm.isAutoUpdate)) {
                        this.$1c = !cm.isAutoUpdate
                    }
                    ck.resolve(this.$1c)
                }), function(cm, cn) {
                    ck.reject(J.createServerError(cn))
                });
                this._sendCommand(Object).call(this, cj, cl);
                return ck.get_promise()
            },
            $t: function(e, cj) {
                if (e !== 'showExportImageDialog' && e !== 'showExportDataDialog' && e !== 'showExportCrosstabDialog' && e !== 'showExportPDFDialog' && e !== 'showShareDialog' && e !== 'showDownloadWorkbookDialog') {
                    throw J.createInternalError(null)
                }
                var ck = {};
                ck['api.invokeCommandName'] = e;
                if (ss.isValue(cj)) {
                    ck['api.invokeCommandParam'] = cj
                }
                var cl = new(ss.makeGenericType(bj, [Object]))('api.InvokeCommandCommand', 0, null, null);
                this._sendCommand(Object).call(this, ck, cl)
            },
            $i: function(e) {
                var cj = JSON.parse(e.get_data());
                this.$j(cj)
            },
            $q: function(e) {
                if (ss.isValue(this.$1s) && ss.referenceEquals(this.$1s.get_name(), e.get_workbookName())) {
                    this.$x(null)
                } else {
                    this.$F()
                }
            },
            $l: function(e) {
                if (ss.staticEquals(this.$1$3, null) || !ss.referenceEquals(this.$1s.get_name(), e.get_workbookName())) {
                    return
                }
                var cj = null;
                var ck = this.$1s.get_activeSheetImpl();
                if (ck.get_isStory()) {
                    ck = ck.get_activeStoryPointImpl().get_containedSheetImpl()
                }
                if (ss.referenceEquals(ck.get_name(), e.get_worksheetName())) {
                    cj = ck
                } else if (ck.get_isDashboard()) {
                    var cl = ck;
                    cj = cl.get_worksheets()._get(e.get_worksheetName())._impl
                }
                if (ss.isValue(cj)) {
                    cj.set_selectedMarks(null);
                    this.$1$3(new bu('marksselection', this.$1p, cj))
                }
            },
            $k: function(e) {
                if (ss.staticEquals(this.$1$4, null) || !ss.referenceEquals(this.$1s.get_name(), e.get_workbookName())) {
                    return
                }
                var cj = null;
                var ck = this.$1s.get_activeSheetImpl();
                if (ck.get_isStory()) {
                    ck = ck.get_activeStoryPointImpl().get_containedSheetImpl()
                }
                if (ss.referenceEquals(ck.get_name(), e.get_worksheetName())) {
                    cj = ck
                } else if (ck.get_isDashboard()) {
                    var cl = ck;
                    cj = cl.get_worksheets()._get(e.get_worksheetName())._impl
                }
                if (ss.isValue(cj)) {
                    cj.highlightedMarks = null;
                    this.$1$4(new br('markshighlight', this.$1p, cj))
                }
            },
            $h: function(e) {
                if (ss.staticEquals(this.$1$5, null) || !ss.referenceEquals(this.$1s.get_name(), e.get_workbookName())) {
                    return
                }
                var cj = null;
                var ck = this.$1s.get_activeSheetImpl();
                if (ss.referenceEquals(ck.get_name(), e.get_worksheetName())) {
                    cj = ck
                } else if (ck.get_isDashboard()) {
                    var cl = ck;
                    cj = cl.get_worksheets()._get(e.get_worksheetName())._impl
                } else if (ck.get_isStory()) {
                    var cm = ck;
                    var cn = cm.get_activeStoryPointImpl();
                    var co = cn.get_containedSheetImpl();
                    if (co.get_isDashboard()) {
                        var cp = co;
                        cj = cp.get_worksheets()._get(e.get_worksheetName())._impl
                    } else if (ss.referenceEquals(co.get_name(), e.get_worksheetName())) {
                        cj = co
                    }
                }
                if (ss.isValue(cj)) {
                    var cq = JSON.parse(e.get_data());
                    var cr = cq[0];
                    var cs = cq[1];
                    this.$1$5(new bp('filterchange', this.$1p, cj, cr, cs))
                }
            },
            $m: function(e) {
                if (!ss.staticEquals(this.$1$6, null)) {
                    if (ss.referenceEquals(this.$1s.get_name(), e.get_workbookName())) {
                        this.$1s.$l(null);
                        var cj = e.get_data();
                        this.$E(cj)
                    }
                }
            },
            $g: function(e) {
                var cj = JSON.parse(e.get_data());
                var ck = ss.mkdel(this, function() {
                    v._processCustomViews(this.$1s, this.$1j, cj)
                });
                var cl = ss.mkdel(this, function() {
                    this.$D();
                    if (!ss.staticEquals(this.$1$7, null) && !cj.customViewLoaded) {
                        this.$z(this.$1s.get_activeCustomView())
                    }
                });
                if (ss.isNullOrUndefined(this.$1s)) {
                    this.$1g = true;
                    this.$1s = new O(this, this.$1j, ss.mkdel(this, function() {
                        ck();
                        this.$x(cl);
                        this.$1g = false
                    }))
                } else {
                    ck();
                    this.$9(cl)
                }
            },
            $f: function(e) {
                var cj = JSON.parse(e.get_data());
                if (ss.isNullOrUndefined(this.$1s)) {
                    this.$1s = new O(this, this.$1j, null)
                }
                if (ss.isValue(this.$1s)) {
                    v._processCustomViewUpdate(this.$1s, this.$1j, cj, true)
                }
                if (!ss.staticEquals(this.$1$8, null)) {
                    var ck = this.$1s.$p()._toApiCollection();
                    for (var cl = 0, cm = ck.length; cl < cm; cl++) {
                        this.$B(ck[cl])
                    }
                }
            },
            $d: function() {
                if (!ss.staticEquals(this.$1$9, null)) {
                    var e = this.$1s.$n()._toApiCollection();
                    for (var cj = 0, ck = e.length; cj < ck; cj++) {
                        this.$A(e[cj])
                    }
                }
            },
            $e: function(e) {
                var cj = JSON.parse(e.get_data());
                if (ss.isValue(this.$1s)) {
                    v._processCustomViews(this.$1s, this.$1j, cj)
                }
                if (!ss.staticEquals(this.$1$10, null) && ss.isValue(cj.defaultCustomViewId)) {
                    var ck = this.$1s.$i();
                    for (var cl = 0; cl < ck.get__length(); cl++) {
                        var cm = ck.get_item(cl);
                        if (cm.getDefault()) {
                            this.$C(cm);
                            break
                        }
                    }
                }
            },
            $o: function(e) {
                this.$1s._update(ss.mkdel(this, function() {
                    if (ss.isValue(this.$1b)) {
                        this.$1b()
                    }
                    if (ss.referenceEquals(this.$1s.get_name(), e.get_workbookName())) {
                        var cj = e.get_worksheetName();
                        var ck = e.get_data();
                        this.$G(cj, ck)
                    }
                    this.$x(null)
                }))
            },
            $p: function(e) {
                var cj = JSON.parse(e.get_data());
                var ck = new K(this, cj);
                if (!ss.staticEquals(this.$1$12, null)) {
                    this.$1$12(new bE('toolbarstatechange', this.$1p, ck))
                }
            },
            $n: function(e) {
                var cj = this.$1s.get_activeSheetImpl();
                if (cj.get_sheetType() === 'story') {
                    cj.update(JSON.parse(e.get_data()))
                }
            },
            $x: function(e) {
                if (!this.$1k) {
                    var cj = this.$1l;
                    window.setTimeout(ss.mkdel(this, function() {
                        if (!ss.staticEquals(cj, null)) {
                            cj(new bC('firstinteractive', this.$1p))
                        }
                        if (!ss.staticEquals(e, null)) {
                            e()
                        }
                    }), 0);
                    this.$1k = true
                }
                this.$F()
            },
            $9: function(e) {
                var cj = new Date;
                var ck = null;
                ck = ss.mkdel(this, function() {
                    var cl = new Date;
                    if (this.$1k) {
                        e()
                    } else if (cl - cj > 300000) {
                        throw J.createInternalError('Timed out while waiting for the viz to become interactive')
                    } else {
                        window.setTimeout(ck, 10)
                    }
                });
                ck()
            },
            $2: function() {
                if (L.isIE()) {
                    if (this.$1e['readyState'] === 'complete') {
                        this.handleVizLoad()
                    }
                } else {
                    this.handleVizLoad()
                }
            },
            $v: function() {
                window.setTimeout(ss.mkdel(this, this.$2), 3000)
            },
            $6: function(e) {
                var cj = document.createElement('div');
                cj.style.background = "transparent url('" + this.$1n.staticImageUrl + "') no-repeat scroll 0 0";
                cj.style.left = '8px';
                cj.style.top = (this.$1n.tabs ? '31px' : '9px');
                cj.style.position = 'absolute';
                cj.style.width = e.width + 'px';
                cj.style.height = e.height + 'px';
                this.$3().appendChild(cj);
                return cj
            },
            $5: function() {
                if (ss.isNullOrUndefined(this.$3())) {
                    return null
                }
                var e = document.createElement('IFrame');
                e.frameBorder = '0';
                e.setAttribute('allowTransparency', 'true');
                e.setAttribute('allowFullScreen', 'true');
                e.setAttribute('title', this.$a());
                e.marginHeight = '0';
                e.marginWidth = '0';
                e.style.display = 'block';
                if (this.$1n.fixedSize) {
                    e.style.width = this.$1n.width;
                    e.style.height = this.$1n.height
                } else {
                    e.style.width = '1px';
                    e.style.height = '1px';
                    e.setAttribute('scrolling', 'no')
                }
                if (L.isSafari()) {
                    e.addEventListener('mousewheel', ss.mkdel(this, this.$w), false)
                }
                this.$3().appendChild(e);
                return e
            },
            $a: function() {
                var e = window.navigator.language;
                if (e === 'zh-CN') {
                    return '数据可视化'
                }
                switch (e.substr(0, 2)) {
                    case 'fr':
                        {
                            return 'Visualisation de données'
                        }
                    case 'es':
                        {
                            return 'Visualización de datos'
                        }
                    case 'pt':
                        {
                            return 'Visualização de dados'
                        }
                    case 'ja':
                        {
                            return 'データ ビジュアライゼーション'
                        }
                    case 'de':
                        {
                            return 'Datenvisualisierung'
                        }
                    case 'ko':
                        {
                            return '데이터 비주얼리제이션'
                        }
                    case 'en':
                    default:
                        {
                            return 'data visualization'
                        }
                }
            },
            $w: function(e) {},
            $c: function() {
                return ss.mkdel(this, function(e) {
                    this.$v()
                })
            },
            $j: function(e) {
                var cj = by.fromSizeConstraints(e.sizeConstraints);
                this.$1q = bH.$ctor(cj, e.chromeHeight);
                if (ss.isValue(this.$1m)) {
                    this.$1m(new bq('firstvizsizeknown', this.$1p, this.$1q))
                }
                if (this.$1n.fixedSize) {
                    return
                }
                this.$K();
                this.$0();
                this.$S()
            },
            $L: function() {
                if (ss.isNullOrUndefined(this.$1r)) {
                    return
                }
                if (L.hasWindowAddEventListener()) {
                    window.removeEventListener('resize', this.$1r, false)
                } else {
                    window.self.detachEvent('onresize', this.$1r)
                }
                this.$1r = null
            },
            $0: function() {
                if (ss.isValue(this.$1r)) {
                    return
                }
                this.$1r = ss.mkdel(this, function() {
                    this.$K()
                });
                if (L.hasWindowAddEventListener()) {
                    window.addEventListener('resize', this.$1r, false)
                } else {
                    window.self.attachEvent('onresize', this.$1r)
                }
            }
        }, null, [bs]);
        ss.initClass(bG, a, {
            getAvailableSize: function() {
                return this.$2
            }
        }, bC);
        ss.initClass(bH, a, {}, Object);
        ss.initClass(bR, a, {
            getFilterType: function() {
                return this.$6
            },
            getFieldName: function() {
                return this.$1
            },
            getWorksheet: function() {
                return this.$7.get_worksheet()
            },
            getFieldAsync: function() {
                var e = new tab._Deferred;
                if (ss.isNullOrUndefined(this.$3)) {
                    var cj = function(cl) {
                        e.reject(cl);
                        return null
                    };
                    var ck = ss.mkdel(this, function(cl) {
                        this.$3 = new bQ(cl, this.$1, this.$5, this.$4);
                        e.resolve(this.$3);
                        return null
                    });
                    this.$7.$q(this.$2).then(ck, cj)
                } else {
                    window.setTimeout(ss.mkdel(this, function() {
                        e.resolve(this.$3)
                    }), 0)
                }
                return e.get_promise()
            },
            _update: function(e) {
                this.$0(e);
                this._updateFromJson(e)
            },
            _addFieldParams: function(e) {},
            _updateFromJson: null,
            $0: function(e) {
                this.$1 = e.caption;
                this.$6 = T.convertFilterType(e.filterType);
                this.$3 = null;
                this.$2 = e.dataSourceName;
                this.$5 = T.convertFieldRole(ss.coalesce(e.fieldRole, 'unknown'));
                this.$4 = T.convertFieldAggregation(ss.coalesce(e.fieldAggregation, 'NONE'))
            }
        });
        ss.initClass(bJ, a, {
            getIsExcludeMode: function() {
                return this.$a
            },
            getAppliedValues: function() {
                return this.$9
            },
            _updateFromJson: function(e) {
                this.$8(e)
            },
            $8: function(e) {
                this.$a = e.isExclude;
                if (ss.isValue(e.appliedValues)) {
                    this.$9 = [];
                    for (var cj = 0; cj < e.appliedValues.length; cj++) {
                        var ck = e.appliedValues[cj];
                        this.$9.push(L.getDataValue(ck))
                    }
                }
            }
        }, bR);
        ss.initClass(bK, a, {
            getFieldName: function() {
                return this.$0.get_fieldName()
            },
            getDataType: function() {
                return this.$0.get_dataType()
            },
            getIsReferenced: function() {
                return this.$0.get_isReferenced()
            },
            getIndex: function() {
                return this.$0.get_index()
            }
        });
        ss.initClass(bL, a, {
            getWorkbook: function() {
                return this._impl.$b()
            },
            getUrl: function() {
                return this._impl.$a()
            },
            getName: function() {
                return this._impl.$7()
            },
            setName: function(e) {
                this._impl.$8(e)
            },
            getOwnerName: function() {
                return this._impl.$9()
            },
            getAdvertised: function() {
                return this._impl.$3()
            },
            setAdvertised: function(e) {
                this._impl.$4(e)
            },
            getDefault: function() {
                return this._impl.$6()
            },
            saveAsync: function() {
                return this._impl.$2()
            }
        });
        ss.initClass(bY, a, {
            getName: function() {
                return this._impl.get_name()
            },
            getIndex: function() {
                return this._impl.get_index()
            },
            getWorkbook: function() {
                return this._impl.get_workbookImpl().get_workbook()
            },
            getSize: function() {
                return this._impl.get_size()
            },
            getIsHidden: function() {
                return this._impl.get_isHidden()
            },
            getIsActive: function() {
                return this._impl.get_isActive()
            },
            getSheetType: function() {
                return this._impl.get_sheetType()
            },
            getUrl: function() {
                return this._impl.get_url()
            },
            changeSizeAsync: function(e) {
                return this._impl.changeSizeAsync(e)
            }
        });
        ss.initClass(bM, a, {
            getParentStoryPoint: function() {
                return this._impl.get_parentStoryPoint()
            },
            getObjects: function() {
                return this._impl.get_objects()._toApiCollection()
            },
            getWorksheets: function() {
                return this._impl.get_worksheets()._toApiCollection()
            }
        }, bY);
        ss.initClass(bN, a, {
            getObjectType: function() {
                return this.$2.objectType
            },
            getDashboard: function() {
                return this.$0
            },
            getWorksheet: function() {
                return this.$1
            },
            getPosition: function() {
                return this.$2.position
            },
            getSize: function() {
                return this.$2.size
            }
        });
        ss.initClass(bO, a, {
            getName: function() {
                return this.$0.get_name()
            },
            getFields: function() {
                return this.$0.get_fields()._toApiCollection()
            },
            getIsPrimary: function() {
                return this.$0.get_isPrimary()
            }
        });
        ss.initClass(bP, a, {
            getName: function() {
                return this.$0.get_name()
            },
            getData: function() {
                return this.$0.get_rows()
            },
            getColumns: function() {
                return this.$0.get_columns()
            },
            getTotalRowCount: function() {
                return this.$0.get_totalRowCount()
            },
            getIsSummaryData: function() {
                return this.$0.get_isSummaryData()
            }
        });
        ss.initClass(bQ, a, {
            getDataSource: function() {
                return this.$0
            },
            getName: function() {
                return this.$3
            },
            getRole: function() {
                return this.$2
            },
            getAggregation: function() {
                return this.$1
            }
        });
        ss.initClass(bS, a, {
            _addFieldParams: function(e) {
                e['api.filterHierarchicalLevels'] = this.$9
            },
            _updateFromJson: function(e) {
                this.$8(e)
            },
            $8: function(e) {
                this.$9 = e.levels
            }
        }, bR);
        ss.initClass(bT, a, {
            getPairs: function() {
                return this.$0.$1()
            }
        });
        ss.initClass(bU, a, {});
        ss.initClass(bV, a, {
            getName: function() {
                return this._impl.$7()
            },
            getCurrentValue: function() {
                return this._impl.$2()
            },
            getDataType: function() {
                return this._impl.$3()
            },
            getAllowableValuesType: function() {
                return this._impl.$1()
            },
            getAllowableValues: function() {
                return this._impl.$0()
            },
            getMinValue: function() {
                return this._impl.$6()
            },
            getMaxValue: function() {
                return this._impl.$5()
            },
            getStepSize: function() {
                return this._impl.$9()
            },
            getDateStepPeriod: function() {
                return this._impl.$4()
            }
        });
        ss.initClass(bW, a, {
            getMin: function() {
                return this.$d
            },
            getMax: function() {
                return this.$c
            },
            getIncludeNullValues: function() {
                return this.$b
            },
            getDomainMin: function() {
                return this.$a
            },
            getDomainMax: function() {
                return this.$9
            },
            _updateFromJson: function(e) {
                this.$8(e)
            },
            $8: function(e) {
                this.$a = L.getDataValue(e.domainMinValue);
                this.$9 = L.getDataValue(e.domainMaxValue);
                this.$d = L.getDataValue(e.minValue);
                this.$c = L.getDataValue(e.maxValue);
                this.$b = e.includeNullValues
            }
        }, bR);
        ss.initClass(bX, a, {
            getPeriod: function() {
                return this.$9
            },
            getRange: function() {
                return this.$b
            },
            getRangeN: function() {
                return this.$a
            },
            _updateFromJson: function(e) {
                this.$8(e)
            },
            $8: function(e) {
                if (ss.isValue(e.periodType)) {
                    this.$9 = T.convertPeriodType(ss.unbox(e.periodType))
                }
                if (ss.isValue(e.rangeType)) {
                    this.$b = T.convertDateRange(ss.unbox(e.rangeType))
                }
                if (ss.isValue(e.rangeN)) {
                    this.$a = ss.unbox(e.rangeN)
                }
            }
        }, bR);
        ss.initClass(bZ, a, {
            getName: function() {
                return this.$0.name
            },
            getSheetType: function() {
                return this.$0.sheetType
            },
            getSize: function() {
                return this.$0.size
            },
            getIndex: function() {
                return this.$0.index
            },
            getUrl: function() {
                return this.$0.url
            },
            getIsActive: function() {
                return this.$0.isActive
            },
            getIsHidden: function() {
                return this.$0.isHidden
            },
            getWorkbook: function() {
                return this.$0.workbook
            }
        });
        ss.initClass(ca, a, {
            getActiveStoryPoint: function() {
                return this._impl.get_activeStoryPointImpl().get_storyPoint()
            },
            getStoryPointsInfo: function() {
                return this._impl.get_storyPointsInfo()
            },
            activatePreviousStoryPointAsync: function() {
                return this._impl.activatePreviousStoryPointAsync()
            },
            activateNextStoryPointAsync: function() {
                return this._impl.activateNextStoryPointAsync()
            },
            activateStoryPointAsync: function(e) {
                return this._impl.activateStoryPointAsync(e)
            },
            revertStoryPointAsync: function(e) {
                return this._impl.revertStoryPointAsync(e)
            }
        }, bY);
        ss.initClass(cb, a, {
            getCaption: function() {
                return this.$0.get_caption()
            },
            getContainedSheet: function() {
                return (ss.isValue(this.$0.get_containedSheetImpl()) ? this.$0.get_containedSheetImpl().get_sheet() : null)
            },
            getIndex: function() {
                return this.$0.get_index()
            },
            getIsActive: function() {
                return this.$0.get_isActive()
            },
            getIsUpdated: function() {
                return this.$0.get_isUpdated()
            },
            getParentStory: function() {
                return this.$0.get_parentStoryImpl().get_story()
            }
        });
        ss.initClass(cc, a, {
            getCaption: function() {
                return this._impl.caption
            },
            getIndex: function() {
                return this._impl.index
            },
            getIsActive: function() {
                return this._impl.isActive
            },
            getIsUpdated: function() {
                return this._impl.isUpdated
            },
            getParentStory: function() {
                return this._impl.parentStoryImpl.get_story()
            }
        });
        ss.initClass(cd, a, {
            getViz: function() {
                return this._impl.get_viz()
            },
            isButtonEnabled: function(e) {
                return this._impl.isButtonEnabled(e)
            }
        });
        ss.initClass(ce, a, {
            getMajor: function() {
                return this.$0
            },
            getMinor: function() {
                return this.$2
            },
            getPatch: function() {
                return this.$3
            },
            getMetadata: function() {
                return this.$1
            },
            toString: function() {
                var e = this.$0 + '.' + this.$2 + '.' + this.$3;
                if (ss.isValue(this.$1) && this.$1.length > 0) {
                    e += '-' + this.$1
                }
                return e
            }
        });
        ss.initClass(cf, a, {
            getAreTabsHidden: function() {
                return this._impl.$13()
            },
            getIsToolbarHidden: function() {
                return this._impl.$15()
            },
            getIsHidden: function() {
                return this._impl.$14()
            },
            getInstanceId: function() {
                return this._impl.get_instanceId()
            },
            getParentElement: function() {
                return this._impl.$16()
            },
            getUrl: function() {
                return this._impl.$17()
            },
            getVizSize: function() {
                return this._impl.$19()
            },
            getWorkbook: function() {
                return this._impl.$1a()
            },
            getAreAutomaticUpdatesPaused: function() {
                return this._impl.$12()
            },
            getCurrentUrlAsync: function() {
                return this._impl.getCurrentUrlAsync()
            },
            addEventListener: function(e, cj) {
                this._impl.addEventListener(e, cj)
            },
            removeEventListener: function(e, cj) {
                this._impl.removeEventListener(e, cj)
            },
            dispose: function() {
                this._impl.$7()
            },
            show: function() {
                this._impl.$S()
            },
            hide: function() {
                this._impl.$r()
            },
            showExportDataDialog: function(e) {
                this._impl.$V(e)
            },
            showExportCrossTabDialog: function(e) {
                this._impl.$U(e)
            },
            showExportImageDialog: function() {
                this._impl.$W()
            },
            showExportPDFDialog: function() {
                this._impl.$X()
            },
            revertAllAsync: function() {
                return this._impl.$N()
            },
            refreshDataAsync: function() {
                return this._impl.$J()
            },
            showShareDialog: function() {
                this._impl.$Y()
            },
            showDownloadWorkbookDialog: function() {
                this._impl.$T()
            },
            pauseAutomaticUpdatesAsync: function() {
                return this._impl.$y()
            },
            resumeAutomaticUpdatesAsync: function() {
                return this._impl.$M()
            },
            toggleAutomaticUpdatesAsync: function() {
                return this._impl.$Z()
            },
            refreshSize: function() {
                this._impl.$K()
            },
            setFrameSize: function(e, cj) {
                var ck = e;
                var cl = cj;
                if (L.isNumber(e)) {
                    ck = e.toString() + 'px'
                }
                if (L.isNumber(cj)) {
                    cl = cj.toString() + 'px'
                }
                this._impl.$R(ck, cl)
            },
            redoAsync: function() {
                return this._impl.$I()
            },
            undoAsync: function() {
                return this._impl.$10()
            }
        });
        ss.initClass(cg, a, {});
        ss.initClass(ch, a, {
            getViz: function() {
                return this.$0.get_viz()
            },
            getPublishedSheetsInfo: function() {
                return this.$0.get_publishedSheets()._toApiCollection()
            },
            getName: function() {
                return this.$0.get_name()
            },
            getActiveSheet: function() {
                return this.$0.get_activeSheetImpl().get_sheet()
            },
            getActiveCustomView: function() {
                return this.$0.get_activeCustomView()
            },
            activateSheetAsync: function(e) {
                return this.$0._setActiveSheetAsync(e)
            },
            revertAllAsync: function() {
                return this.$0._revertAllAsync()
            },
            getCustomViewsAsync: function() {
                return this.$0.$6()
            },
            showCustomViewAsync: function(e) {
                return this.$0.$f(e)
            },
            removeCustomViewAsync: function(e) {
                return this.$0.$c(e)
            },
            rememberCustomViewAsync: function(e) {
                return this.$0.$b(e)
            },
            setActiveCustomViewAsDefaultAsync: function() {
                return this.$0.$e()
            },
            getParametersAsync: function() {
                return this.$0.$7()
            },
            changeParameterValueAsync: function(e, cj) {
                return this.$0.$2(e, cj)
            }
        });
        ss.initClass(ci, a, {
            getParentDashboard: function() {
                return this._impl.get_parentDashboard()
            },
            getParentStoryPoint: function() {
                return this._impl.get_parentStoryPoint()
            },
            getDataSourcesAsync: function() {
                return this._impl.$r()
            },
            getFilterAsync: function(e, cj) {
                return this._impl.$s(null, e, cj)
            },
            getFiltersAsync: function(e) {
                return this._impl.$t(e)
            },
            applyFilterAsync: function(e, cj, ck, cl) {
                return this._impl.$e(e, cj, ck, cl)
            },
            clearFilterAsync: function(e) {
                return this._impl.$m(e)
            },
            applyRangeFilterAsync: function(e, cj) {
                return this._impl.$i(e, cj)
            },
            applyRelativeDateFilterAsync: function(e, cj) {
                return this._impl.$k(e, cj)
            },
            applyHierarchicalFilterAsync: function(e, cj, ck, cl) {
                return this._impl.$g(e, cj, ck, cl)
            },
            clearSelectedMarksAsync: function() {
                return this._impl.$p()
            },
            selectMarksAsync: function(e, cj, ck) {
                return this._impl.$B(e, cj, ck)
            },
            getSelectedMarksAsync: function() {
                return this._impl.$v()
            },
            getSummaryDataAsync: function(e) {
                return this._impl.$w(e)
            },
            getUnderlyingDataAsync: function(e) {
                return this._impl.$x(e)
            },
            clearHighlightedMarksAsync: function() {
                return this._impl.$o()
            },
            highlightMarksAsync: function(e, cj) {
                return this._impl.$y(e, cj)
            },
            highlightMarksByPatternMatchAsync: function(e, cj) {
                return this._impl.$z(e, cj)
            },
            getHighlightedMarksAsync: function() {
                return this._impl.$u()
            }
        }, bY);
        (function() {
            p.crossDomainEventNotificationId = 'xdomainSourceId';
            p.$0 = 0
        })();
        (function() {
            M.$5 = []
        })();
        (function() {
            A.$0 = 'array';
            A.$1 = 'boolean';
            A.$2 = 'date';
            A.$3 = 'function';
            A.$4 = 'number';
            A.$5 = 'object';
            A.$6 = 'regexp';
            A.$7 = 'string';
            A.$8 = ss.mkdict(['[object Boolean]', 'boolean', '[object Number]', 'number', '[object String]', 'string', '[object Function]', 'function', '[object Array]', 'array', '[object Date]', 'date', '[object RegExp]', 'regexp', '[object Object]', 'object']);
            A.$e = String.prototype['trim'];
            A.$d = Object.prototype['toString'];
            A.$f = new RegExp('^[\\s\\xA0]+');
            A.$g = new RegExp('[\\s\\xA0]+$');
            A.$a = new RegExp('^[\\],:{}\\s]*$');
            A.$b = new RegExp('\\\\(?:["\\\\\\/bfnrt]|u[0-9a-fA-F]{4})', 'g');
            A.$c = new RegExp('"[^"\\\\\\n\\r]*"|true|false|null|-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?', 'g');
            A.$9 = new RegExp('(?:^|:|,)(?:\\s*\\[)+', 'g')
        })();
        (function() {
            var e = global.tableauSoftware;
            e.DeviceType = {
                DEFAULT: 'default',
                DESKTOP: 'desktop',
                TABLET: 'tablet',
                PHONE: 'phone'
            };
            e.DashboardObjectType = {
                BLANK: 'blank',
                WORKSHEET: 'worksheet',
                QUICK_FILTER: 'quickFilter',
                PARAMETER_CONTROL: 'parameterControl',
                PAGE_FILTER: 'pageFilter',
                LEGEND: 'legend',
                TITLE: 'title',
                TEXT: 'text',
                IMAGE: 'image',
                WEB_PAGE: 'webPage'
            };
            e.DataType = {
                FLOAT: 'float',
                INTEGER: 'integer',
                STRING: 'string',
                BOOLEAN: 'boolean',
                DATE: 'date',
                DATETIME: 'datetime'
            };
            e.DateRangeType = {
                LAST: 'last',
                LASTN: 'lastn',
                NEXT: 'next',
                NEXTN: 'nextn',
                CURR: 'curr',
                TODATE: 'todate'
            };
            e.ErrorCode = {
                INTERNAL_ERROR: 'internalError',
                SERVER_ERROR: 'serverError',
                INVALID_AGGREGATION_FIELD_NAME: 'invalidAggregationFieldName',
                INVALID_TOOLBAR_BUTTON_NAME: 'invalidToolbarButtonName',
                INVALID_PARAMETER: 'invalidParameter',
                INVALID_URL: 'invalidUrl',
                STALE_DATA_REFERENCE: 'staleDataReference',
                VIZ_ALREADY_IN_MANAGER: 'vizAlreadyInManager',
                NO_URL_OR_PARENT_ELEMENT_NOT_FOUND: 'noUrlOrParentElementNotFound',
                INVALID_FILTER_FIELDNAME: 'invalidFilterFieldName',
                INVALID_FILTER_FIELDVALUE: 'invalidFilterFieldValue',
                INVALID_FILTER_FIELDNAME_OR_VALUE: 'invalidFilterFieldNameOrValue',
                FILTER_CANNOT_BE_PERFORMED: 'filterCannotBePerformed',
                NOT_ACTIVE_SHEET: 'notActiveSheet',
                INVALID_CUSTOM_VIEW_NAME: 'invalidCustomViewName',
                MISSING_RANGEN_FOR_RELATIVE_DATE_FILTERS: 'missingRangeNForRelativeDateFilters',
                MISSING_MAX_SIZE: 'missingMaxSize',
                MISSING_MIN_SIZE: 'missingMinSize',
                MISSING_MINMAX_SIZE: 'missingMinMaxSize',
                INVALID_SIZE: 'invalidSize',
                INVALID_SIZE_BEHAVIOR_ON_WORKSHEET: 'invalidSizeBehaviorOnWorksheet',
                SHEET_NOT_IN_WORKBOOK: 'sheetNotInWorkbook',
                INDEX_OUT_OF_RANGE: 'indexOutOfRange',
                DOWNLOAD_WORKBOOK_NOT_ALLOWED: 'downloadWorkbookNotAllowed',
                NULL_OR_EMPTY_PARAMETER: 'nullOrEmptyParameter',
                BROWSER_NOT_CAPABLE: 'browserNotCapable',
                UNSUPPORTED_EVENT_NAME: 'unsupportedEventName',
                INVALID_DATE_PARAMETER: 'invalidDateParameter',
                INVALID_SELECTION_FIELDNAME: 'invalidSelectionFieldName',
                INVALID_SELECTION_VALUE: 'invalidSelectionValue',
                INVALID_SELECTION_DATE: 'invalidSelectionDate',
                NO_URL_FOR_HIDDEN_WORKSHEET: 'noUrlForHiddenWorksheet',
                MAX_VIZ_RESIZE_ATTEMPTS: 'maxVizResizeAttempts'
            };
            e.FieldAggregationType = {
                SUM: 'SUM',
                AVG: 'AVG',
                MIN: 'MIN',
                MAX: 'MAX',
                STDEV: 'STDEV',
                STDEVP: 'STDEVP',
                VAR: 'VAR',
                VARP: 'VARP',
                COUNT: 'COUNT',
                COUNTD: 'COUNTD',
                MEDIAN: 'MEDIAN',
                ATTR: 'ATTR',
                NONE: 'NONE',
                PERCENTILE: 'PERCENTILE',
                YEAR: 'YEAR',
                QTR: 'QTR',
                MONTH: 'MONTH',
                DAY: 'DAY',
                HOUR: 'HOUR',
                MINUTE: 'MINUTE',
                SECOND: 'SECOND',
                WEEK: 'WEEK',
                WEEKDAY: 'WEEKDAY',
                MONTHYEAR: 'MONTHYEAR',
                MDY: 'MDY',
                END: 'END',
                TRUNC_YEAR: 'TRUNC_YEAR',
                TRUNC_QTR: 'TRUNC_QTR',
                TRUNC_MONTH: 'TRUNC_MONTH',
                TRUNC_WEEK: 'TRUNC_WEEK',
                TRUNC_DAY: 'TRUNC_DAY',
                TRUNC_HOUR: 'TRUNC_HOUR',
                TRUNC_MINUTE: 'TRUNC_MINUTE',
                TRUNC_SECOND: 'TRUNC_SECOND',
                QUART1: 'QUART1',
                QUART3: 'QUART3',
                SKEWNESS: 'SKEWNESS',
                KURTOSIS: 'KURTOSIS',
                INOUT: 'INOUT',
                SUM_XSQR: 'SUM_XSQR',
                USER: 'USER'
            };
            e.FieldRoleType = {
                DIMENSION: 'dimension',
                MEASURE: 'measure',
                UNKNOWN: 'unknown'
            };
            e.FilterUpdateType = {
                ALL: 'all',
                REPLACE: 'replace',
                ADD: 'add',
                REMOVE: 'remove'
            };
            e.FilterType = {
                CATEGORICAL: 'categorical',
                QUANTITATIVE: 'quantitative',
                HIERARCHICAL: 'hierarchical',
                RELATIVEDATE: 'relativedate'
            };
            e.NullOption = {
                NULL_VALUES: 'nullValues',
                NON_NULL_VALUES: 'nonNullValues',
                ALL_VALUES: 'allValues'
            };
            e.ParameterAllowableValuesType = {
                ALL: 'all',
                LIST: 'list',
                RANGE: 'range'
            };
            e.ParameterDataType = {
                FLOAT: 'float',
                INTEGER: 'integer',
                STRING: 'string',
                BOOLEAN: 'boolean',
                DATE: 'date',
                DATETIME: 'datetime'
            };
            e.PeriodType = {
                YEAR: 'year',
                QUARTER: 'quarter',
                MONTH: 'month',
                WEEK: 'week',
                DAY: 'day',
                HOUR: 'hour',
                MINUTE: 'minute',
                SECOND: 'second'
            };
            e.SelectionUpdateType = {
                REPLACE: 'replace',
                ADD: 'add',
                REMOVE: 'remove'
            };
            e.SheetSizeBehavior = {
                AUTOMATIC: 'automatic',
                EXACTLY: 'exactly',
                RANGE: 'range',
                ATLEAST: 'atleast',
                ATMOST: 'atmost'
            };
            e.SheetType = {
                WORKSHEET: 'worksheet',
                DASHBOARD: 'dashboard',
                STORY: 'story'
            };
            e.TableauEventName = {
                CUSTOM_VIEW_LOAD: 'customviewload',
                CUSTOM_VIEW_REMOVE: 'customviewremove',
                CUSTOM_VIEW_SAVE: 'customviewsave',
                CUSTOM_VIEW_SET_DEFAULT: 'customviewsetdefault',
                FILTER_CHANGE: 'filterchange',
                FIRST_INTERACTIVE: 'firstinteractive',
                FIRST_VIZ_SIZE_KNOWN: 'firstvizsizeknown',
                MARKS_SELECTION: 'marksselection',
                MARKS_HIGHLIGHT: 'markshighlight',
                PARAMETER_VALUE_CHANGE: 'parametervaluechange',
                STORY_POINT_SWITCH: 'storypointswitch',
                TAB_SWITCH: 'tabswitch',
                TOOLBAR_STATE_CHANGE: 'toolbarstatechange',
                VIZ_RESIZE: 'vizresize'
            };
            e.ToolbarPosition = {
                TOP: 'top',
                BOTTOM: 'bottom'
            };
            e.ToolbarButtonName = {
                REDO: 'redo',
                UNDO: 'undo'
            }
        })();
        (function() {
            q.$4 = null;
            q.$5 = null
        })();
        (function() {
            E.noZoneId = 4294967295
        })();
        (function() {
            P.$5 = new RegExp('\\[[^\\]]+\\]\\.', 'g')
        })();
        (function() {
            ce.$0 = new ce(2, 2, 0, 'null')
        })()
    })();
    window.tableau = window.tableauSoftware = global.tableauSoftware;
    tableauSoftware.Promise = tab._PromiseImpl;
    tab._Deferred = tab._DeferredImpl;
    tab._Collection = tab._CollectionImpl;
    tab._ApiBootstrap.initialize()
})();