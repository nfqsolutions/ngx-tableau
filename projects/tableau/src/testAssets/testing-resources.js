/*! tableau-2.9.1 */
export const MOCK_RESPONSE = (function () {
  /*! BEGIN MscorlibSlim */
  var global = {};
  (function (global) {
    'use strict';
    var ss = { __assemblies: {} };
    ss.initAssembly = function (obj, name, res) {
      res = res || {};
      obj.name = name;
      obj.toString = function () {
        return this.name;
      };
      obj.__types = {};
      obj.getResourceNames = function () {
        return Object.keys(res);
      };
      obj.getResourceDataBase64 = function (name) {
        return res[name] || null;
      };
      obj.getResourceData = function (name) {
        var r = res[name];
        return r ? ss.dec64(r) : null;
      };
      ss.__assemblies[name] = obj;
    };
    ss.initAssembly(ss, 'mscorlib');
    ss.getAssemblies = function () {
      return Object.keys(ss.__assemblies).map(function (n) {
        return ss.__assemblies[n];
      });
    };
    ss.isNullOrUndefined = function (o) {
      return o === null || o === undefined;
    };
    ss.isValue = function (o) {
      return o !== null && o !== undefined;
    };
    ss.referenceEquals = function (a, b) {
      return ss.isValue(a) ? a === b : !ss.isValue(b);
    };
    ss.mkdict = function () {
      var a = arguments.length !== 1 ? arguments : arguments[0];
      var r = {};
      for (var i = 0; i < a.length; i += 2) {
        r[a[i]] = a[i + 1];
      }
      return r;
    };
    ss.clone = function (t, o) {
      return o ? t.$clone(o) : o;
    };
    ss.coalesce = function (a, b) {
      return ss.isValue(a) ? a : b;
    };
    ss.isDate = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Date]';
    };
    ss.isArray = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };
    ss.isTypedArrayType = function (type) {
      return (
        [
          'Float32Array',
          'Float64Array',
          'Int8Array',
          'Int16Array',
          'Int32Array',
          'Uint8Array',
          'Uint16Array',
          'Uint32Array',
          'Uint8ClampedArray',
        ].indexOf(ss.getTypeFullName(type)) >= 0
      );
    };
    ss.isArrayOrTypedArray = function (obj) {
      return ss.isArray(obj) || ss.isTypedArrayType(ss.getInstanceType(obj));
    };
    ss.equals = function (a, b) {
      if (!ss.isValue(a)) throw new ss_NullReferenceException('Object is null');
      else if (a !== ss && typeof a.equals === 'function') return a.equals(b);
      if (ss.isDate(a) && ss.isDate(b)) return a.valueOf() === b.valueOf();
      else if (typeof a === 'function' && typeof b === 'function')
        return ss.delegateEquals(a, b);
      else if (ss.isNullOrUndefined(a) && ss.isNullOrUndefined(b)) return true;
      else return a === b;
    };
    ss.compare = function (a, b) {
      if (!ss.isValue(a)) throw new ss_NullReferenceException('Object is null');
      else if (
        typeof a === 'number' ||
        typeof a === 'string' ||
        typeof a === 'boolean'
      )
        return ss.isValue(b) ? (a < b ? -1 : a > b ? 1 : 0) : 1;
      else if (ss.isDate(a))
        return ss.isValue(b) ? ss.compare(a.valueOf(), b.valueOf()) : 1;
      else return a.compareTo(b);
    };
    ss.equalsT = function (a, b) {
      if (!ss.isValue(a)) throw new ss_NullReferenceException('Object is null');
      else if (
        typeof a === 'number' ||
        typeof a === 'string' ||
        typeof a === 'boolean'
      )
        return a === b;
      else if (ss.isDate(a)) return a.valueOf() === b.valueOf();
      else return a.equalsT(b);
    };
    ss.staticEquals = function (a, b) {
      if (!ss.isValue(a)) return !ss.isValue(b);
      else return ss.isValue(b) ? ss.equals(a, b) : false;
    };
    ss.shallowCopy = (function () {
      try {
        var x = Object.getOwnPropertyDescriptor({ a: 0 }, 'a').value;
        return true;
      } catch (ex) {
        return false;
      }
    })()
      ? function (source, target) {
          var keys = Object.keys(source);
          for (var i = 0, l = keys.length; i < l; i++) {
            Object.defineProperty(
              target,
              keys[i],
              Object.getOwnPropertyDescriptor(source, keys[i])
            );
          }
        }
      : function (source, target) {
          var keys = Object.keys(source);
          for (var i = 0, l = keys.length; i < l; i++) {
            target[keys[i]] = source[keys[i]];
          }
        };
    if (typeof window == 'object') {
      if (!window.Element) {
        window.Element = function () {};
        window.Element.isInstanceOfType = function (instance) {
          return (
            instance &&
            typeof instance.constructor === 'undefined' &&
            typeof instance.tagName === 'string'
          );
        };
      }
      window.Element.__typeName = 'Element';
      ss.parseXml = function (markup) {
        var domParser = new DOMParser();
        return domParser.parseFromString(markup, 'text/xml');
      };
    }
    ss.clearKeys = function (d) {
      for (var n in d) {
        if (d.hasOwnProperty(n)) delete d[n];
      }
    };
    ss.keyExists = function (d, key) {
      return d[key] !== undefined;
    };
    if (!Object.keys) {
      Object.keys = (function () {
        var hasOwnProperty = Object.prototype.hasOwnProperty,
          hasDontEnumBug = !{ toString: null }.propertyIsEnumerable('toString'),
          dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor',
          ],
          dontEnumsLength = dontEnums.length;
        return function (obj) {
          if (
            typeof obj !== 'object' &&
            (typeof obj !== 'function' || obj === null)
          ) {
            throw new TypeError('Object.keys called on non-object');
          }
          var result = [],
            prop,
            i;
          for (prop in obj) {
            if (hasOwnProperty.call(obj, prop)) {
              result.push(prop);
            }
          }
          if (hasDontEnumBug) {
            for (i = 0; i < dontEnumsLength; i++) {
              if (hasOwnProperty.call(obj, dontEnums[i])) {
                result.push(dontEnums[i]);
              }
            }
          }
          return result;
        };
      })();
    }
    ss.getKeyCount = function (d) {
      return Object.keys(d).length;
    };
    ss.__genericCache = {};
    ss._makeGenericTypeName = function (genericType, typeArguments) {
      var result = ss.getTypeFullName(genericType);
      for (var i = 0; i < typeArguments.length; i++)
        result +=
          (i === 0 ? '[' : ',') +
          '[' +
          ss.getTypeFullName(typeArguments[i]) +
          ']';
      result += ']';
      return result;
    };
    ss.makeGenericType = function (genericType, typeArguments) {
      var name = ss._makeGenericTypeName(genericType, typeArguments);
      return (
        ss.__genericCache[ss._makeQName(name, genericType.__assembly)] ||
        genericType.apply(null, typeArguments)
      );
    };
    ss._registerGenericInstance = function (
      genericType,
      typeArguments,
      instance,
      members,
      statics,
      init
    ) {
      if (!instance) {
        instance = function () {};
      }
      var name = ss._makeGenericTypeName(genericType, typeArguments);
      ss.__genericCache[ss._makeQName(name, genericType.__assembly)] = instance;
      instance.__typeName = name;
      instance.__assembly = genericType.__assembly;
      instance.__genericTypeDefinition = genericType;
      instance.__typeArguments = typeArguments;
      if (statics) {
        ss.shallowCopy(statics, instance);
      }
      init(instance);
      if (members) {
        ss.shallowCopy(members, instance.prototype);
      }
      return instance;
    };
    ss.registerGenericClassInstance = function (
      genericType,
      typeArguments,
      instance,
      members,
      statics,
      baseType,
      getInterfaceTypesFunc
    ) {
      return ss._registerGenericInstance(
        genericType,
        typeArguments,
        instance,
        members,
        statics,
        function (inst) {
          ss.initClass(
            inst,
            baseType ? baseType() : null,
            getInterfaceTypesFunc ? getInterfaceTypesFunc() : null
          );
        }
      );
    };
    ss.registerGenericStructInstance = function (
      genericType,
      typeArguments,
      instance,
      members,
      statics,
      getInterfaceTypesFunc
    ) {
      return ss._registerGenericInstance(
        genericType,
        typeArguments,
        instance,
        members,
        statics,
        function (inst) {
          ss.initStruct(
            inst,
            getInterfaceTypesFunc ? getInterfaceTypesFunc() : null
          );
        }
      );
    };
    ss.registerGenericInterfaceInstance = function (
      genericType,
      typeArguments,
      members,
      getBaseInterfacesFunc
    ) {
      return ss._registerGenericInstance(
        genericType,
        typeArguments,
        null,
        members,
        null,
        function (instance) {
          ss.initInterface(
            instance,
            members,
            getBaseInterfacesFunc ? getBaseInterfacesFunc() : null
          );
        }
      );
    };
    ss.isGenericTypeDefinition = function (type) {
      return type.__isGenericTypeDefinition || false;
    };
    ss.getGenericTypeDefinition = function (type) {
      return type.__genericTypeDefinition || null;
    };
    ss.getGenericParameterCount = function (type) {
      return type.__typeArgumentCount || 0;
    };
    ss.getGenericArguments = function (type) {
      return type.__typeArguments || null;
    };
    ss.__anonymousCache = {};
    ss.anonymousType = function () {
      var members = Array.prototype.slice.call(arguments);
      var name =
        'Anonymous<' +
        members
          .map(function (m) {
            return m[1] + ':' + ss.getTypeFullName(m[0]);
          })
          .join(',') +
        '>';
      var type = ss.__anonymousCache[name];
      if (!type) {
        type = new Function(
          members
            .map(function (m) {
              return m[1];
            })
            .join(','),
          members
            .map(function (m) {
              return 'this.' + m[1] + '=' + m[1] + ';';
            })
            .join('')
        );
        type.__typeName = name;
        var infos = members.map(function (m) {
          return {
            name: m[1],
            typeDef: type,
            type: 16,
            returnType: m[0],
            getter: {
              name: 'get_' + m[1],
              typeDef: type,
              params: [],
              returnType: m[0],
              fget: m[1],
            },
          };
        });
        infos.push({
          name: '.ctor',
          typeDef: type,
          type: 1,
          params: members.map(function (m) {
            return m[0];
          }),
        });
        type.__metadata = { members: infos };
        ss.__anonymousCache[name] = type;
      }
      return type;
    };
    ss.setMetadata = function (type, metadata) {
      if (metadata.members) {
        for (var i = 0; i < metadata.members.length; i++) {
          var m = metadata.members[i];
          m.typeDef = type;
          if (m.adder) m.adder.typeDef = type;
          if (m.remover) m.remover.typeDef = type;
          if (m.getter) m.getter.typeDef = type;
          if (m.setter) m.setter.typeDef = type;
        }
      }
      type.__metadata = metadata;
      if (metadata.variance) {
        type.isAssignableFrom = function (source) {
          var check = function (target, type) {
            if (
              type.__genericTypeDefinition === target.__genericTypeDefinition &&
              type.__typeArguments.length === target.__typeArguments.length
            ) {
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
                    if (s !== t) return false;
                }
              }
              return true;
            }
            return false;
          };
          if (source.__interface && check(this, source)) return true;
          var ifs = ss.getInterfaces(source);
          for (var i = 0; i < ifs.length; i++) {
            if (ifs[i] === this || check(this, ifs[i])) return true;
          }
          return false;
        };
      }
    };
    ss.setMetadata = function (type, metadata) {};
    ss.mkType = function (asm, typeName, ctor, members, statics) {
      if (!ctor) ctor = function () {};
      ctor.__assembly = asm;
      ctor.__typeName = typeName;
      if (asm) asm.__types[typeName] = ctor;
      if (members) ctor.__members = members;
      if (statics) ss.shallowCopy(statics, ctor);
      return ctor;
    };
    ss.mkEnum = function (asm, typeName, values, namedValues) {
      var result = ss.mkType(asm, typeName);
      ss.shallowCopy(values, result.prototype);
      result.__enum = true;
      result.getDefaultValue = result.createInstance = function () {
        return namedValues ? null : 0;
      };
      result.isInstanceOfType = function (instance) {
        return typeof instance === (namedValues ? 'string' : 'number');
      };
      return result;
    };
    ss.initClass = function (ctor, baseType, interfaces) {
      ctor.__class = true;
      if (baseType && baseType !== Object) {
        var f = function () {};
        f.prototype = baseType.prototype;
        ctor.prototype = new f();
        ctor.prototype.constructor = ctor;
      }
      if (ctor.__members) {
        ss.shallowCopy(ctor.__members, ctor.prototype);
        delete ctor.__members;
      }
      if (interfaces) ctor.__interfaces = interfaces;
    };
    ss.initStruct = function (ctor, interfaces) {
      ss.initClass(ctor, null, interfaces);
      ctor.__class = false;
      ctor.getDefaultValue =
        ctor.getDefaultValue ||
        ctor.createInstance ||
        function () {
          return new ctor();
        };
    };
    ss.initGenericClass = function (ctor, typeArgumentCount) {
      ctor.__class = true;
      ctor.__typeArgumentCount = typeArgumentCount;
      ctor.__isGenericTypeDefinition = true;
    };
    ss.initGenericStruct = function (ctor, typeArgumentCount) {
      ss.initGenericClass(ctor, typeArgumentCount);
      ctor.__class = false;
    };
    ss.initInterface = function (ctor, members, baseInterfaces) {
      ctor.__interface = true;
      if (baseInterfaces) {
        ctor.__interfaces = baseInterfaces;
      }
      ss.shallowCopy(members, ctor.prototype);
      ctor.isAssignableFrom = function (type) {
        return ss.contains(ss.getInterfaces(type), this);
      };
    };
    ss.initGenericInterface = function (ctor, typeArgumentCount) {
      ctor.__interface = true;
      ctor.__typeArgumentCount = typeArgumentCount;
      ctor.__isGenericTypeDefinition = true;
    };
    ss.getBaseType = function (type) {
      if (type === Object || type.__interface) {
        return null;
      } else if (Object.getPrototypeOf) {
        return Object.getPrototypeOf(type.prototype).constructor;
      } else {
        var p = type.prototype;
        if (Object.prototype.hasOwnProperty.call(p, 'constructor')) {
          var ownValue = p.constructor;
          try {
            delete p.constructor;
            return p.constructor;
          } finally {
            p.constructor = ownValue;
          }
        }
        return p.constructor;
      }
    };
    ss.getTypeFullName = function (type) {
      return (
        type.__typeName ||
        type.name ||
        (type.toString().match(/^\s*function\s*([^\s(]+)/) || [])[1] ||
        'Object'
      );
    };
    ss._makeQName = function (name, asm) {
      return name + (asm ? ', ' + asm.name : '');
    };
    ss.getTypeQName = function (type) {
      return ss._makeQName(ss.getTypeFullName(type), type.__assembly);
    };
    ss.getTypeName = function (type) {
      var fullName = ss.getTypeFullName(type);
      var bIndex = fullName.indexOf('[');
      var nsIndex = fullName.lastIndexOf(
        '.',
        bIndex >= 0 ? bIndex : fullName.length
      );
      return nsIndex > 0 ? fullName.substr(nsIndex + 1) : fullName;
    };
    ss.getTypeNamespace = function (type) {
      var fullName = ss.getTypeFullName(type);
      var bIndex = fullName.indexOf('[');
      var nsIndex = fullName.lastIndexOf(
        '.',
        bIndex >= 0 ? bIndex : fullName.length
      );
      return nsIndex > 0 ? fullName.substr(0, nsIndex) : '';
    };
    ss.getTypeAssembly = function (type) {
      if (ss.contains([Date, Number, Boolean, String, Function, Array], type))
        return ss;
      else return type.__assembly || null;
    };
    ss._getAssemblyType = function (asm, name) {
      if (asm.__types) {
        return asm.__types[name] || null;
      } else {
        var a = name.split('.');
        for (var i = 0; i < a.length; i++) {
          asm = asm[a[i]];
          if (!ss.isValue(asm)) return null;
        }
        if (typeof asm !== 'function') return null;
        return asm;
      }
    };
    ss.getAssemblyTypes = function (asm) {
      var result = [];
      if (asm.__types) {
        for (var t in asm.__types) {
          if (asm.__types.hasOwnProperty(t)) result.push(asm.__types[t]);
        }
      } else {
        var traverse = function (s, n) {
          for (var c in s) {
            if (s.hasOwnProperty(c)) traverse(s[c], c);
          }
          if (typeof s === 'function' && ss.isUpper(n.charCodeAt(0)))
            result.push(s);
        };
        traverse(asm, '');
      }
      return result;
    };
    ss.createAssemblyInstance = function (asm, typeName) {
      var t = ss.getType(typeName, asm);
      return t ? ss.createInstance(t) : null;
    };
    ss.getInterfaces = function (type) {
      if (type.__interfaces) return type.__interfaces;
      else if (type === Date || type === Number)
        return [ss_IEquatable, ss_IComparable, ss_IFormattable];
      else if (type === Boolean || type === String)
        return [ss_IEquatable, ss_IComparable];
      else if (type === Array || ss.isTypedArrayType(type))
        return [
          ss_IEnumerable,
          ss_ICollection,
          ss_IList,
          ss_IReadOnlyCollection,
          ss_IReadOnlyList,
        ];
      else return [];
    };
    ss.isInstanceOfType = function (instance, type) {
      if (ss.isNullOrUndefined(instance)) return false;
      if (typeof type.isInstanceOfType === 'function')
        return type.isInstanceOfType(instance);
      return ss.isAssignableFrom(type, ss.getInstanceType(instance));
    };
    ss.isAssignableFrom = function (target, type) {
      return (
        target === type ||
        (typeof target.isAssignableFrom === 'function' &&
          target.isAssignableFrom(type)) ||
        type.prototype instanceof target
      );
    };
    ss.isClass = function (type) {
      return (
        type.__class === true ||
        type === Array ||
        type === Function ||
        type === RegExp ||
        type === String ||
        type === Error ||
        type === Object
      );
    };
    ss.isEnum = function (type) {
      return !!type.__enum;
    };
    ss.isFlags = function (type) {
      return (type.__metadata && type.__metadata.enumFlags) || false;
    };
    ss.isInterface = function (type) {
      return !!type.__interface;
    };
    ss.safeCast = function (instance, type) {
      if (type === true) return instance;
      else if (type === false) return null;
      else return ss.isInstanceOfType(instance, type) ? instance : null;
    };
    ss.cast = function (instance, type) {
      if (instance === null || typeof instance === 'undefined') return instance;
      else if (
        type === true ||
        (type !== false && ss.isInstanceOfType(instance, type))
      )
        return instance;
      throw new ss_InvalidCastException(
        'Cannot cast object to type ' + ss.getTypeFullName(type)
      );
    };
    ss.getInstanceType = function (instance) {
      if (!ss.isValue(instance))
        throw new ss_NullReferenceException('Cannot get type of null');
      try {
        return instance.constructor;
      } catch (ex) {
        return Object;
      }
    };
    ss._getType = function (typeName, asm, re) {
      var outer = !re;
      re = re || /[[,\]]/g;
      var last = re.lastIndex,
        m = re.exec(typeName),
        tname,
        targs = [];
      var t;
      if (m) {
        tname = typeName.substring(last, m.index);
        switch (m[0]) {
          case '[':
            if (typeName[m.index + 1] !== '[') return null;
            for (;;) {
              re.exec(typeName);
              t = ss._getType(typeName, global, re);
              if (!t) return null;
              targs.push(t);
              m = re.exec(typeName);
              if (m[0] === ']') break;
              else if (m[0] !== ',') return null;
            }
            m = re.exec(typeName);
            if (m && m[0] === ',') {
              re.exec(typeName);
              if (
                !(asm =
                  ss.__assemblies[
                    (re.lastIndex > 0
                      ? typeName.substring(m.index + 1, re.lastIndex - 1)
                      : typeName.substring(m.index + 1)
                    ).trim()
                  ])
              )
                return null;
            }
            break;
          case ']':
            break;
          case ',':
            re.exec(typeName);
            if (
              !(asm =
                ss.__assemblies[
                  (re.lastIndex > 0
                    ? typeName.substring(m.index + 1, re.lastIndex - 1)
                    : typeName.substring(m.index + 1)
                  ).trim()
                ])
            )
              return null;
            break;
        }
      } else {
        tname = typeName.substring(last);
      }
      if (outer && re.lastIndex) return null;
      t = ss._getAssemblyType(asm, tname.trim());
      return targs.length ? ss.makeGenericType(t, targs) : t;
    };
    ss.getType = function (typeName, asm) {
      return typeName ? ss._getType(typeName, asm || global) : null;
    };
    ss.getDefaultValue = function (type) {
      if (typeof type.getDefaultValue === 'function')
        return type.getDefaultValue();
      else if (type === Boolean) return false;
      else if (type === Date) return new Date(0);
      else if (type === Number) return 0;
      return null;
    };
    ss.createInstance = function (type) {
      if (typeof type.createInstance === 'function')
        return type.createInstance();
      else if (type === Boolean) return false;
      else if (type === Date) return new Date(0);
      else if (type === Number) return 0;
      else if (type === String) return '';
      else return new type();
    };
    var ss_IFormattable = (ss.IFormattable = ss.mkType(ss, 'ss.IFormattable'));
    ss.initInterface(ss_IFormattable, { format: null });
    var ss_IComparable = (ss.IComparable = ss.mkType(ss, 'ss.IComparable'));
    ss.initInterface(ss_IComparable, { compareTo: null });
    var ss_IEquatable = (ss.IEquatable = ss.mkType(ss, 'ss.IEquatable'));
    ss.initInterface(ss_IEquatable, { equalsT: null });
    ss.isNullOrEmptyString = function (s) {
      return !s || !s.length;
    };
    if (!String.prototype.trim) {
      String.prototype.trim = function () {
        return ss.trimStartString(ss.trimEndString(this));
      };
    }
    ss.trimEndString = function (s, chars) {
      return s.replace(
        chars
          ? new RegExp('[' + String.fromCharCode.apply(null, chars) + ']+$')
          : /\s*$/,
        ''
      );
    };
    ss.trimStartString = function (s, chars) {
      return s.replace(
        chars
          ? new RegExp('^[' + String.fromCharCode.apply(null, chars) + ']+')
          : /^\s*/,
        ''
      );
    };
    ss.trimString = function (s, chars) {
      return ss.trimStartString(ss.trimEndString(s, chars), chars);
    };
    ss.arrayClone = function (arr) {
      if (arr.length === 1) {
        return [arr[0]];
      } else {
        return Array.apply(null, arr);
      }
    };
    if (!Array.prototype.map) {
      Array.prototype.map = function (callback, instance) {
        var length = this.length;
        var mapped = new Array(length);
        for (var i = 0; i < length; i++) {
          if (i in this) {
            mapped[i] = callback.call(instance, this[i], i, this);
          }
        }
        return mapped;
      };
    }
    if (!Array.prototype.some) {
      Array.prototype.some = function (callback, instance) {
        var length = this.length;
        for (var i = 0; i < length; i++) {
          if (i in this && callback.call(instance, this[i], i, this)) {
            return true;
          }
        }
        return false;
      };
    }
    if (!Array.prototype.forEach) {
      Array.prototype.forEach = function (callback, thisArg) {
        var T, k;
        if (this == null) {
          throw new TypeError(' this is null or not defined');
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== 'function') {
          throw new TypeError(callback + ' is not a function');
        }
        if (arguments.length > 1) {
          T = thisArg;
        }
        k = 0;
        while (k < len) {
          var kValue;
          if (k in O) {
            kValue = O[k];
            callback.call(T, kValue, k, O);
          }
          k++;
        }
      };
    }
    if (!Array.prototype.filter) {
      Array.prototype.filter = function (fun) {
        if (this === void 0 || this === null) {
          throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== 'function') {
          throw new TypeError();
        }
        var res = [];
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
          if (i in t) {
            var val = t[i];
            if (fun.call(thisArg, val, i, t)) {
              res.push(val);
            }
          }
        }
        return res;
      };
    }
    ss._delegateContains = function (targets, object, method) {
      for (var i = 0; i < targets.length; i += 2) {
        if (targets[i] === object && targets[i + 1] === method) {
          return true;
        }
      }
      return false;
    };
    ss._mkdel = function (targets) {
      var delegate = function () {
        if (targets.length === 2) {
          return targets[1].apply(targets[0], arguments);
        } else {
          var clone = ss.arrayClone(targets);
          for (var i = 0; i < clone.length; i += 2) {
            if (ss._delegateContains(targets, clone[i], clone[i + 1])) {
              clone[i + 1].apply(clone[i], arguments);
            }
          }
          return null;
        }
      };
      delegate._targets = targets;
      return delegate;
    };
    ss.mkdel = function (object, method) {
      if (!object) {
        return method;
      }
      if (typeof method === 'string') {
        method = object[method];
      }
      return ss._mkdel([object, method]);
    };
    ss.delegateCombine = function (delegate1, delegate2) {
      if (!delegate1) {
        if (!delegate2._targets) {
          return ss.mkdel(null, delegate2);
        }
        return delegate2;
      }
      if (!delegate2) {
        if (!delegate1._targets) {
          return ss.mkdel(null, delegate1);
        }
        return delegate1;
      }
      var targets1 = delegate1._targets
        ? delegate1._targets
        : [null, delegate1];
      var targets2 = delegate2._targets
        ? delegate2._targets
        : [null, delegate2];
      return ss._mkdel(targets1.concat(targets2));
    };
    ss.delegateRemove = function (delegate1, delegate2) {
      if (!delegate1 || delegate1 === delegate2) {
        return null;
      }
      var targets = delegate1._targets;
      if (!delegate2 || !targets) {
        return delegate1;
      }
      var object = null;
      var method;
      if (delegate2._targets) {
        object = delegate2._targets[0];
        method = delegate2._targets[1];
      } else {
        method = delegate2;
      }
      for (var i = 0; i < targets.length; i += 2) {
        if (targets[i] === object && targets[i + 1] === method) {
          if (targets.length === 2) {
            return null;
          }
          var t = ss.arrayClone(targets);
          t.splice(i, 2);
          return ss._mkdel(t);
        }
      }
      return delegate1;
    };
    ss.delegateEquals = function (a, b) {
      if (a === b) return true;
      if (!a._targets && !b._targets) return false;
      var ta = a._targets || [null, a],
        tb = b._targets || [null, b];
      if (ta.length !== tb.length) return false;
      for (var i = 0; i < ta.length; i++) {
        if (ta[i] !== tb[i]) return false;
      }
      return true;
    };
    var ss_Enum = (ss.Enum = ss.mkType(ss, 'ss.Enum', {}));
    ss.initClass(ss_Enum);
    ss_Enum.getValues = function Enum$getValues(enumType) {
      var parts = [];
      var values = enumType.prototype;
      for (var i in values) {
        if (values.hasOwnProperty(i)) parts.push(values[i]);
      }
      return parts;
    };
    var ss_IEnumerator = (ss.IEnumerator = ss.mkType(ss, 'ss.IEnumerator'));
    ss.initInterface(
      ss_IEnumerator,
      { current: null, moveNext: null, reset: null },
      [ss_IDisposable]
    );
    var ss_IEnumerable = (ss.IEnumerable = ss.mkType(ss, 'ss.IEnumerable'));
    ss.initInterface(ss_IEnumerable, { getEnumerator: null });
    ss.getEnumerator = function (obj) {
      return obj.getEnumerator
        ? obj.getEnumerator()
        : new ss_ArrayEnumerator(obj);
    };
    var ss_ICollection = (ss.ICollection = ss.mkType(ss, 'ss.ICollection'));
    ss.initInterface(
      ss_ICollection,
      { get_count: null, add: null, clear: null, remove: null, contains: null },
      [ss_IEnumerable]
    );
    ss.count = function (obj) {
      return obj.get_count ? obj.get_count() : obj.length;
    };
    ss.add = function (obj, item) {
      if (obj.add) obj.add(item);
      else if (ss.isArray(obj)) obj.push(item);
      else throw new ss_NotSupportedException();
    };
    ss.clear = function (obj) {
      if (obj.clear) obj.clear();
      else if (ss.isArray(obj)) obj.length = 0;
      else throw new ss_NotSupportedException();
    };
    ss.remove = function (obj, item) {
      if (obj.remove) return obj.remove(item);
      else if (ss.isArray(obj)) {
        var index = ss.indexOf(obj, item);
        if (index >= 0) {
          obj.splice(index, 1);
          return true;
        }
        return false;
      } else throw new ss_NotSupportedException();
    };
    ss.contains = function (obj, item) {
      if (obj.contains) return obj.contains(item);
      else return ss.indexOf(obj, item) >= 0;
    };
    var ss_IReadOnlyCollection = (ss.IReadOnlyCollection = ss.mkType(
      ss,
      'ss.IReadOnlyCollection'
    ));
    ss.initInterface(
      ss_IReadOnlyCollection,
      { get_count: null, contains: null },
      [ss_IEnumerable]
    );
    var ss_IEqualityComparer = (ss.IEqualityComparer = ss.mkType(
      ss,
      'ss.IEqualityComparer'
    ));
    ss.initInterface(ss_IEqualityComparer, {
      areEqual: null,
      getObjectHashCode: null,
    });
    var ss_IComparer = (ss.IComparer = ss.mkType(ss, 'ss.IComparer'));
    ss.initInterface(ss_IComparer, { compare: null });
    ss.unbox = function (instance) {
      if (!ss.isValue(instance))
        throw new ss_InvalidOperationException(
          'Nullable object must have a value.'
        );
      return instance;
    };
    var ss_Nullable$1 = (ss.Nullable$1 = ss.mkType(
      ss,
      'ss.Nullable$1',
      function (T) {
        var $type = ss.registerGenericClassInstance(
          ss_Nullable$1,
          [T],
          null,
          {},
          {
            isInstanceOfType: function (instance) {
              return ss.isInstanceOfType(instance, T);
            },
          }
        );
        return $type;
      },
      null,
      {
        eq: function (a, b) {
          return !ss.isValue(a) ? !ss.isValue(b) : a === b;
        },
        ne: function (a, b) {
          return !ss.isValue(a) ? ss.isValue(b) : a !== b;
        },
        le: function (a, b) {
          return ss.isValue(a) && ss.isValue(b) && a <= b;
        },
        ge: function (a, b) {
          return ss.isValue(a) && ss.isValue(b) && a >= b;
        },
        lt: function (a, b) {
          return ss.isValue(a) && ss.isValue(b) && a < b;
        },
        gt: function (a, b) {
          return ss.isValue(a) && ss.isValue(b) && a > b;
        },
        sub: function (a, b) {
          return ss.isValue(a) && ss.isValue(b) ? a - b : null;
        },
        add: function (a, b) {
          return ss.isValue(a) && ss.isValue(b) ? a + b : null;
        },
        mod: function (a, b) {
          return ss.isValue(a) && ss.isValue(b) ? a % b : null;
        },
        div: function (a, b) {
          return ss.isValue(a) && ss.isValue(b) ? a / b : null;
        },
        mul: function (a, b) {
          return ss.isValue(a) && ss.isValue(b) ? a * b : null;
        },
        band: function (a, b) {
          return ss.isValue(a) && ss.isValue(b) ? a & b : null;
        },
        bor: function (a, b) {
          return ss.isValue(a) && ss.isValue(b) ? a | b : null;
        },
        bxor: function (a, b) {
          return ss.isValue(a) && ss.isValue(b) ? a ^ b : null;
        },
        shl: function (a, b) {
          return ss.isValue(a) && ss.isValue(b) ? a << b : null;
        },
        srs: function (a, b) {
          return ss.isValue(a) && ss.isValue(b) ? a >> b : null;
        },
        sru: function (a, b) {
          return ss.isValue(a) && ss.isValue(b) ? a >>> b : null;
        },
        and: function (a, b) {
          if (a === true && b === true) return true;
          else if (a === false || b === false) return false;
          else return null;
        },
        or: function (a, b) {
          if (a === true || b === true) return true;
          else if (a === false && b === false) return false;
          else return null;
        },
        xor: function (a, b) {
          return ss.isValue(a) && ss.isValue(b) ? !!(a ^ b) : null;
        },
        not: function (a) {
          return ss.isValue(a) ? !a : null;
        },
        neg: function (a) {
          return ss.isValue(a) ? -a : null;
        },
        pos: function (a) {
          return ss.isValue(a) ? +a : null;
        },
        cpl: function (a) {
          return ss.isValue(a) ? ~a : null;
        },
        lift1: function (f, o) {
          return ss.isValue(o) ? f(o) : null;
        },
        lift2: function (f, a, b) {
          return ss.isValue(a) && ss.isValue(b) ? f(a, b) : null;
        },
        liftcmp: function (f, a, b) {
          return ss.isValue(a) && ss.isValue(b) ? f(a, b) : false;
        },
        lifteq: function (f, a, b) {
          var va = ss.isValue(a),
            vb = ss.isValue(b);
          return (!va && !vb) || (va && vb && f(a, b));
        },
        liftne: function (f, a, b) {
          var va = ss.isValue(a),
            vb = ss.isValue(b);
          return va !== vb || (va && f(a, b));
        },
      }
    ));
    ss.initGenericClass(ss_Nullable$1, 1);
    var ss_IList = (ss.IList = ss.mkType(ss, 'ss.IList'));
    ss.initInterface(
      ss_IList,
      {
        get_item: null,
        set_item: null,
        indexOf: null,
        insert: null,
        removeAt: null,
      },
      [ss_ICollection, ss_IEnumerable]
    );
    ss.getItem = function (obj, index) {
      return obj.get_item ? obj.get_item(index) : obj[index];
    };
    ss.setItem = function (obj, index, value) {
      obj.set_item ? obj.set_item(index, value) : (obj[index] = value);
    };
    ss.indexOf = function (obj, item) {
      if (
        (!item || typeof item.equals !== 'function') &&
        typeof obj.indexOf === 'function'
      ) {
        return obj.indexOf(item);
      } else if (ss.isArrayOrTypedArray(obj)) {
        for (var i = 0; i < obj.length; i++) {
          if (ss.staticEquals(obj[i], item)) {
            return i;
          }
        }
        return -1;
      } else return obj.indexOf(item);
    };
    ss.insert = function (obj, index, item) {
      if (obj.insert) obj.insert(index, item);
      else if (ss.isArray(obj)) obj.splice(index, 0, item);
      else throw new ss_NotSupportedException();
    };
    ss.removeAt = function (obj, index) {
      if (obj.removeAt) obj.removeAt(index);
      else if (ss.isArray(obj)) obj.splice(index, 1);
      else throw new ss_NotSupportedException();
    };
    var ss_IReadOnlyList = (ss.IReadOnlyList = ss.mkType(
      ss,
      'ss.IReadOnlyList'
    ));
    ss.initInterface(ss_IReadOnlyList, { get_item: null }, [
      ss_IReadOnlyCollection,
      ss_IEnumerable,
    ]);
    var defInt = function (name, min, max) {
      var type = (ss[name] = ss.mkType(ss, 'ss.' + name, function () {}, null, {
        isInstanceOfType: function (instance) {
          return (
            typeof instance === 'number' &&
            Math.round(instance, 0) === instance &&
            instance >= min &&
            instance <= max
          );
        },
        createInstance: function () {
          return 0;
        },
      }));
      ss.initStruct(type, [ss_IEquatable, ss_IComparable, ss_IFormattable]);
      return type;
    };
    var ss_Byte = defInt('Byte', 0, 255);
    var ss_SByte = defInt('SByte', -128, 127);
    var ss_Int16 = defInt('Int16', -32768, 32767);
    var ss_UInt16 = defInt('UInt16', 0, 65535);
    var ss_Int32 = defInt('Int32', -2147483648, 2147483647);
    var ss_UInt32 = defInt('UInt32', 0, 4294967295);
    var ss_Int64 = defInt('Int64', -9223372036854775808, 9223372036854775807);
    var ss_UInt64 = defInt('UInt64', 0, 18446744073709551615);
    var ss_Char = defInt('Char', 0, 65535);
    ss.sxb = function (x) {
      return x | (x & 0x80 ? 0xffffff00 : 0);
    };
    ss.sxs = function (x) {
      return x | (x & 0x8000 ? 0xffff0000 : 0);
    };
    ss.clip8 = function (x) {
      return ss.isValue(x) ? ss.sxb(x & 0xff) : null;
    };
    ss.clipu8 = function (x) {
      return ss.isValue(x) ? x & 0xff : null;
    };
    ss.clip16 = function (x) {
      return ss.isValue(x) ? ss.sxs(x & 0xffff) : null;
    };
    ss.clipu16 = function (x) {
      return ss.isValue(x) ? x & 0xffff : null;
    };
    ss.clip32 = function (x) {
      return ss.isValue(x) ? x | 0 : null;
    };
    ss.clipu32 = function (x) {
      return ss.isValue(x) ? x >>> 0 : null;
    };
    ss.clip64 = function (x) {
      return ss.isValue(x)
        ? (Math.floor(x / 0x100000000) | 0) * 0x100000000 + (x >>> 0)
        : null;
    };
    ss.clipu64 = function (x) {
      return ss.isValue(x)
        ? (Math.floor(x / 0x100000000) >>> 0) * 0x100000000 + (x >>> 0)
        : null;
    };
    ss.ck = function (x, tp) {
      if (ss.isValue(x) && !tp.isInstanceOfType(x))
        throw new ss_OverflowException();
      return x;
    };
    ss.trunc = function (n) {
      return ss.isValue(n) ? (n > 0 ? Math.floor(n) : Math.ceil(n)) : null;
    };
    ss.idiv = function (a, b) {
      if (!ss.isValue(a) || !ss.isValue(b)) return null;
      if (!b) throw new ss_DivideByZeroException();
      return ss.trunc(a / b);
    };
    ss.imod = function (a, b) {
      if (!ss.isValue(a) || !ss.isValue(b)) return null;
      if (!b) throw new ss_DivideByZeroException();
      return a % b;
    };
    var ss_JsDate = (ss.JsDate = ss.mkType(
      ss,
      'ss.JsDate',
      function () {},
      null,
      {
        createInstance: function () {
          return new Date();
        },
        isInstanceOfType: function (instance) {
          return instance instanceof Date;
        },
      }
    ));
    ss.initClass(ss_JsDate, null, [ss_IEquatable, ss_IComparable]);
    var ss_ArrayEnumerator = (ss.ArrayEnumerator = ss.mkType(
      ss,
      'ss.ArrayEnumerator',
      function (array) {
        this._array = array;
        this._index = -1;
      },
      {
        moveNext: function () {
          this._index++;
          return this._index < this._array.length;
        },
        reset: function () {
          this._index = -1;
        },
        current: function () {
          if (this._index < 0 || this._index >= this._array.length)
            throw 'Invalid operation';
          return this._array[this._index];
        },
        dispose: function () {},
      }
    ));
    ss.initClass(ss_ArrayEnumerator, null, [ss_IEnumerator, ss_IDisposable]);
    var ss_ObjectEnumerator = (ss.ObjectEnumerator = ss.mkType(
      ss,
      'ss.ObjectEnumerator',
      function (o) {
        this._keys = Object.keys(o);
        this._index = -1;
        this._object = o;
      },
      {
        moveNext: function () {
          this._index++;
          return this._index < this._keys.length;
        },
        reset: function () {
          this._index = -1;
        },
        current: function () {
          if (this._index < 0 || this._index >= this._keys.length)
            throw new ss_InvalidOperationException('Invalid operation');
          var k = this._keys[this._index];
          return { key: k, value: this._object[k] };
        },
        dispose: function () {},
      }
    ));
    ss.initClass(ss_ObjectEnumerator, null, [ss_IEnumerator, ss_IDisposable]);
    var ss_EqualityComparer = (ss.EqualityComparer = ss.mkType(
      ss,
      'ss.EqualityComparer',
      function () {},
      {
        areEqual: function (x, y) {
          return ss.staticEquals(x, y);
        },
        getObjectHashCode: function (obj) {
          return ss.isValue(obj) ? ss.getHashCode(obj) : 0;
        },
      }
    ));
    ss.initClass(ss_EqualityComparer, null, [ss_IEqualityComparer]);
    ss_EqualityComparer.def = new ss_EqualityComparer();
    var ss_Comparer = (ss.Comparer = ss.mkType(
      ss,
      'ss.Comparer',
      function (f) {
        this.f = f;
      },
      {
        compare: function (x, y) {
          return this.f(x, y);
        },
      }
    ));
    ss.initClass(ss_Comparer, null, [ss_IComparer]);
    ss_Comparer.def = new ss_Comparer(function (a, b) {
      if (!ss.isValue(a)) return !ss.isValue(b) ? 0 : -1;
      else if (!ss.isValue(b)) return 1;
      else return ss.compare(a, b);
    });
    var ss_IDisposable = (ss.IDisposable = ss.mkType(ss, 'ss.IDisposable'));
    ss.initInterface(ss_IDisposable, { dispose: null });
    var ss_StringBuilder = (ss.StringBuilder = ss.mkType(
      ss,
      'ss.StringBuilder',
      function (s) {
        this._parts = ss.isValue(s) && s !== '' ? [s] : [];
        this.length = ss.isValue(s) ? s.length : 0;
      },
      {
        append: function (o) {
          if (ss.isValue(o)) {
            var s = o.toString();
            ss.add(this._parts, s);
            this.length += s.length;
          }
          return this;
        },
        appendChar: function (c) {
          return this.append(String.fromCharCode(c));
        },
        appendLine: function (s) {
          this.append(s);
          this.append('\r\n');
          return this;
        },
        appendLineChar: function (c) {
          return this.appendLine(String.fromCharCode(c));
        },
        clear: function () {
          this._parts = [];
          this.length = 0;
        },
        toString: function () {
          return this._parts.join('');
        },
      }
    ));
    ss.initClass(ss_StringBuilder);
    var ss_EventArgs = (ss.EventArgs = ss.mkType(
      ss,
      'ss.EventArgs',
      function () {}
    ));
    ss.initClass(ss_EventArgs);
    ss_EventArgs.Empty = new ss_EventArgs();
    var ss_Exception = (ss.Exception = ss.mkType(
      ss,
      'ss.Exception',
      function (message, innerException) {
        this._message = message || 'An error occurred.';
        this._innerException = innerException || null;
        this._error = new Error();
      },
      {
        get_message: function () {
          return this._message;
        },
        get_innerException: function () {
          return this._innerException;
        },
        get_stack: function () {
          return this._error.stack;
        },
        toString: function () {
          var message = this._message;
          var exception = this;
          if (ss.isNullOrEmptyString(message)) {
            if (
              ss.isValue(ss.getInstanceType(exception)) &&
              ss.isValue(ss.getTypeFullName(ss.getInstanceType(exception)))
            ) {
              message = ss.getTypeFullName(ss.getInstanceType(exception));
            } else {
              message = '[object Exception]';
            }
          }
          return message;
        },
      },
      {
        wrap: function (o) {
          if (ss.isInstanceOfType(o, ss_Exception)) {
            return o;
          } else if (o instanceof TypeError) {
            return new ss_NullReferenceException(
              o.message,
              new ss_JsErrorException(o)
            );
          } else if (o instanceof RangeError) {
            return new ss_ArgumentOutOfRangeException(
              null,
              o.message,
              new ss_JsErrorException(o)
            );
          } else if (o instanceof Error) {
            return new ss_JsErrorException(o);
          } else {
            return new ss_Exception(o.toString());
          }
        },
      }
    ));
    ss.initClass(ss_Exception);
    var ss_NotImplementedException = (ss.NotImplementedException = ss.mkType(
      ss,
      'ss.NotImplementedException',
      function (message, innerException) {
        ss_Exception.call(
          this,
          message || 'The method or operation is not implemented.',
          innerException
        );
      }
    ));
    ss.initClass(ss_NotImplementedException, ss_Exception);
    var ss_NotSupportedException = (ss.NotSupportedException = ss.mkType(
      ss,
      'ss.NotSupportedException',
      function (message, innerException) {
        ss_Exception.call(
          this,
          message || 'Specified method is not supported.',
          innerException
        );
      }
    ));
    ss.initClass(ss_NotSupportedException, ss_Exception);
    var ss_JsErrorException = (ss.JsErrorException = ss.mkType(
      ss,
      'ss.JsErrorException',
      function (error, message, innerException) {
        ss_Exception.call(this, message || error.message, innerException);
        this.error = error;
      },
      {
        get_stack: function () {
          return this.error.stack;
        },
      }
    ));
    ss.initClass(ss_JsErrorException, ss_Exception);
    var ss_ArgumentException = (ss.ArgumentException = ss.mkType(
      ss,
      'ss.ArgumentException',
      function (message, paramName, innerException) {
        ss_Exception.call(
          this,
          message || 'Value does not fall within the expected range.',
          innerException
        );
        this.paramName = paramName || null;
      }
    ));
    ss.initClass(ss_ArgumentException, ss_Exception);
    var ss_ArgumentNullException = (ss.ArgumentNullException = ss.mkType(
      ss,
      'ss.ArgumentNullException',
      function (paramName, message, innerException) {
        if (!message) {
          message = 'Value cannot be null.';
          if (paramName) message += '\nParameter name: ' + paramName;
        }
        ss_ArgumentException.call(this, message, paramName, innerException);
      }
    ));
    ss.initClass(ss_ArgumentNullException, ss_ArgumentException);
    var ss_ArgumentOutOfRangeException = (ss.ArgumentOutOfRangeException =
      ss.mkType(
        ss,
        'ss.ArgumentOutOfRangeException',
        function (paramName, message, innerException, actualValue) {
          if (!message) {
            message = 'Value is out of range.';
            if (paramName) message += '\nParameter name: ' + paramName;
          }
          ss_ArgumentException.call(this, message, paramName, innerException);
          this.actualValue = actualValue || null;
        }
      ));
    ss.initClass(ss_ArgumentOutOfRangeException, ss_ArgumentException);
    var ss_FormatException = (ss.FormatException = ss.mkType(
      ss,
      'ss.FormatException',
      function (message, innerException) {
        ss_Exception.call(this, message || 'Invalid format.', innerException);
      }
    ));
    ss.initClass(ss_FormatException, ss_Exception);
    var ss_ArithmeticException = (ss.ArithmeticException = ss.mkType(
      ss,
      'ss.ArithmeticException',
      function (message, innerException) {
        ss_Exception.call(
          this,
          message || 'Overflow or underflow in the arithmetic operation.',
          innerException
        );
      }
    ));
    ss.initClass(ss_ArithmeticException, ss_Exception);
    var ss_OverflowException = (ss.OverflowException = ss.mkType(
      ss,
      'ss.OverflowException',
      function (message, innerException) {
        ss_ArithmeticException.call(
          this,
          message || 'Arithmetic operation resulted in an overflow.',
          innerException
        );
      }
    ));
    ss.initClass(ss_OverflowException, ss_ArithmeticException);
    var ss_DivideByZeroException = (ss.DivideByZeroException = ss.mkType(
      ss,
      'ss.DivideByZeroException',
      function (message, innerException) {
        ss_ArithmeticException.call(
          this,
          message || 'Division by 0.',
          innerException
        );
      }
    ));
    ss.initClass(ss_DivideByZeroException, ss_ArithmeticException);
    var ss_InvalidCastException = (ss.InvalidCastException = ss.mkType(
      ss,
      'ss.InvalidCastException',
      function (message, innerException) {
        ss_Exception.call(
          this,
          message || 'The cast is not valid.',
          innerException
        );
      }
    ));
    ss.initClass(ss_InvalidCastException, ss_Exception);
    var ss_InvalidOperationException = (ss.InvalidOperationException =
      ss.mkType(
        ss,
        'ss.InvalidOperationException',
        function (message, innerException) {
          ss_Exception.call(
            this,
            message ||
              'Operation is not valid due to the current state of the object.',
            innerException
          );
        }
      ));
    ss.initClass(ss_InvalidOperationException, ss_Exception);
    var ss_NullReferenceException = (ss.NullReferenceException = ss.mkType(
      ss,
      'ss.NullReferenceException',
      function (message, innerException) {
        ss_Exception.call(this, message || 'Object is null.', innerException);
      }
    ));
    ss.initClass(ss_NullReferenceException, ss_Exception);
    var ss_KeyNotFoundException = (ss.KeyNotFoundException = ss.mkType(
      ss,
      'ss.KeyNotFoundException',
      function (message, innerException) {
        ss_Exception.call(this, message || 'Key not found.', innerException);
      }
    ));
    ss.initClass(ss_KeyNotFoundException, ss_Exception);
    var ss_AmbiguousMatchException = (ss.AmbiguousMatchException = ss.mkType(
      ss,
      'ss.AmbiguousMatchException',
      function (message, innerException) {
        ss_Exception.call(this, message || 'Ambiguous match.', innerException);
      }
    ));
    ss.initClass(ss_AmbiguousMatchException, ss_Exception);
    global.ss = ss;
  })(global);
  var ss = global.ss;
  /*! BEGIN CoreSlim */
  (function () {
    'dont use strict';
    var a = {};
    global.tab = global.tab || {};
    ss.initAssembly(a, 'tabcoreslim');
    var b = (global.tab.BaseLogAppender = ss.mkType(
      a,
      'tab.BaseLogAppender',
      function () {
        this.$0 = null;
        this.$0 = [];
      },
      {
        clearFilters: function () {
          ss.clear(this.$0);
        },
        addFilter: function (m) {
          this.$0.push(m);
        },
        removeFilter: function (m) {
          ss.remove(this.$0, m);
        },
        log: function (m, n, o, p) {},
        logInternal: null,
        formatMessage: function (m, n) {
          if (ss.isNullOrUndefined(n) || n.length === 0) {
            return m;
          }
          var o = new ss.StringBuilder();
          var p = 0;
          var q = false;
          for (var r = 0; r < m.length; r++) {
            var s = m.charCodeAt(r);
            if (s === 37) {
              if (q) {
                o.append('%');
                q = false;
              } else {
                q = true;
              }
            } else {
              if (q) {
                switch (s) {
                  case 98:
                  case 115:
                  case 100:
                  case 110:
                  case 111: {
                    o.append(n.length > p ? n[p] : '');
                    p++;
                    break;
                  }
                }
              } else {
                o.appendChar(s);
              }
              q = false;
            }
          }
          return o.toString();
        },
      }
    ));
    var c = (global.tab.ConsoleLogAppender = ss.mkType(
      a,
      'tab.ConsoleLogAppender',
      function () {
        this.$2 = null;
        b.call(this);
      },
      {
        logInternal: function (m, n, o, p) {
          if (typeof window.console !== 'object') {
            return;
          }
          o = m.get_name() + ': ' + o;
          var q = [];
          var r = q.concat(o);
          q = r.concat.apply(r, p);
          try {
            Function.prototype.apply.call(this.$1(n), window.console, q);
          } catch (s) {}
        },
        $1: function (m) {
          var n = window.self['console'];
          if (ss.isNullOrUndefined(this.$2)) {
            this.$2 = {};
            this.$2[(1).toString()] = n.log;
            this.$2[(4).toString()] = n.error;
            this.$2[(2).toString()] = n.info;
            this.$2[(3).toString()] = n.warn;
          }
          var o = this.$2[m.toString()];
          if (ss.isNullOrUndefined(o)) {
            o = n.log;
          }
          return o;
        },
      }
    ));
    var d = (global.tab.EscapingUtil = ss.mkType(
      a,
      'tab.EscapingUtil',
      null,
      null,
      {
        escapeHtml: function (m) {
          var n = ss.coalesce(m, '');
          n = n.replace(new RegExp('&', 'g'), '&amp;');
          n = n.replace(new RegExp('<', 'g'), '&lt;');
          n = n.replace(new RegExp('>', 'g'), '&gt;');
          n = n.replace(new RegExp('"', 'g'), '&quot;');
          n = n.replace(new RegExp("'", 'g'), '&#39;');
          n = n.replace(new RegExp('/', 'g'), '&#47;');
          if (new RegExp('^ +$').test(n)) {
            n = n.replace(new RegExp(' ', 'g'), '&nbsp;');
          }
          return n;
        },
      }
    ));
    var e = (global.tab.Log = ss.mkType(a, 'tab.Log', function () {}, null, {
      get: function (m) {
        return g.lazyGetLogger(ss.getInstanceType(m));
      },
      get$1: function (m) {
        return g.lazyGetLogger(m);
      },
    }));
    var f = (global.tab.LogAppenderInstance = ss.mkType(
      a,
      'tab.LogAppenderInstance',
      function (m) {
        this.$0 = null;
        this.$1$1 = null;
        this.$0 = m;
      },
      {
        get_instance: function () {
          return this.$1$1;
        },
        set_instance: function (m) {
          this.$1$1 = m;
        },
        enableLogging: function (m) {
          if (ss.isNullOrUndefined(this.get_instance())) {
            this.set_instance(this.$0());
            g.addAppender(this.get_instance());
          } else if (!g.hasAppender(this.get_instance())) {
            g.addAppender(this.get_instance());
          }
          this.get_instance().addFilter(
            ss.coalesce(m, function (n, o) {
              return true;
            })
          );
        },
        disableLogging: function () {
          if (ss.isNullOrUndefined(this.get_instance())) {
            return;
          }
          g.removeAppender(this.get_instance());
          this.set_instance(null);
        },
      }
    ));
    var g = (global.tab.Logger = ss.mkType(
      a,
      'tab.Logger',
      function (m) {
        this.$1 = null;
        this.$1 = m;
      },
      {
        get_name: function () {
          return this.$1;
        },
        debug: function (m, n) {},
        info: function (m, n) {},
        warn: function (m, n) {},
        error: function (m, n) {},
        log: function (m, n, o) {},
        $0: function (m, n, o) {
          try {
            for (var p = 0; p < g.$3.length; p++) {
              var q = g.$3[p];
              q.log(this, m, n, o);
            }
          } catch (r) {}
        },
      },
      {
        get_globalLog: function () {
          return g.global;
        },
        clearFilters: function () {
          for (var m = 0; m < g.$3.length; m++) {
            var n = g.$3[m];
            n.clearFilters();
          }
          g.$4.splice(0, g.$4.length);
        },
        filterByLogger: function (m, n) {
          n = n || 0;
          g.$0(function (o, p) {
            return ss.referenceEquals(o, m) && p >= n;
          });
        },
        filterByType: function (m, n) {
          n = n || 0;
          g.$0(function (o, p) {
            return (
              p >= n && ss.referenceEquals(o.get_name(), ss.getTypeName(m))
            );
          });
        },
        filterByName: function (m, n) {
          n = n || 0;
          var o = new RegExp(m, 'i');
          g.$0(function (p, q) {
            return q >= n && ss.isValue(p.get_name().match(o));
          });
        },
        clearAppenders: function () {
          g.$3.splice(0, g.$4.length);
        },
        hasAppender: function (m) {
          return g.$3.indexOf(m) > -1;
        },
        addAppender: function (m) {
          for (var n = 0; n < g.$4.length; n++) {
            var o = g.$4[n];
            m.addFilter(o);
          }
          g.$3.push(m);
        },
        removeAppender: function (m) {
          var n = g.$3.indexOf(m);
          if (n > -1) {
            g.$3.splice(n, 1);
          }
        },
        lazyGetLogger: function (m) {
          var n = '_logger';
          var o = m[n];
          if (ss.isNullOrUndefined(o)) {
            o = g.getLogger(m, null);
            m[n] = o;
          }
          return o;
        },
        getLogger: function (m, n) {
          var o = g.getLoggerWithName(ss.getTypeName(m));
          if (ss.isValue(n)) {
          }
          return o;
        },
        getLoggerWithName: function (m) {
          return g.$6;
        },
        $1: function () {
          var m = k.getUriQueryParameters(window.self.location.search);
          if (!ss.keyExists(m, ':log')) {
            return;
          }
          var n = m[':log'];
          if (n.length === 0) {
          }
          for (var o = 0; o < n.length; o++) {
            var p = n[o];
            var q = p.split(String.fromCharCode(58));
            var r = 1;
            if (q.length > 0 && ss.isValue(q[1])) {
              var s = q[1].toLowerCase();
              var t = g.loggerLevelNames.indexOf(s);
              if (t >= 0) {
                r = t;
              }
            }
          }
        },
        $0: function (m) {
          g.$4.push(m);
          for (var n = 0; n < g.$3.length; n++) {
            var o = g.$3[n];
            o.addFilter(m);
          }
        },
      }
    ));
    var h = (global.tab.LoggerLevel = ss.mkEnum(a, 'tab.LoggerLevel', {
      all: 0,
      debug: 1,
      info: 2,
      warn: 3,
      error: 4,
      off: 5,
    }));
    var i = (global.tab.ScriptEx = ss.mkType(a, 'tab.ScriptEx'));
    var j = (global.tab.StringExtensions = ss.mkType(
      a,
      'tab.StringExtensions',
      null,
      null,
      {
        decodeUriComponentCorrectly: function (m) {
          return decodeURIComponent(m.replace(new RegExp('\\+', 'g'), ' '));
        },
      }
    ));
    var k = (global.tab.UriExtensions = ss.mkType(
      a,
      'tab.UriExtensions',
      null,
      null,
      {
        getUriQueryParameters: function (m) {
          var n = {};
          if (ss.isNullOrUndefined(m)) {
            return n;
          }
          var o = m.indexOf('?');
          if (o < 0) {
            return n;
          }
          var p = m.substr(o + 1);
          var q = p.indexOf('#');
          if (q >= 0) {
            p = p.substr(0, q);
          }
          if (ss.isNullOrEmptyString(p)) {
            return n;
          }
          var r = p.split('&');
          for (var s = 0; s < r.length; s++) {
            var t = r[s];
            var u = t.split('=');
            var v = j.decodeUriComponentCorrectly(u[0]);
            var w;
            if (ss.keyExists(n, v)) {
              w = n[v];
            } else {
              w = [];
              n[v] = w;
            }
            if (u.length > 1) {
              w.push(j.decodeUriComponentCorrectly(u[1]));
            }
          }
          return n;
        },
      }
    ));
    var l = (global.tab.WindowHelper = ss.mkType(
      a,
      'tab.WindowHelper',
      function (m) {
        this.$0 = null;
        this.$0 = m;
      },
      {
        get_pageXOffset: function () {
          return l.$9(this.$0);
        },
        get_pageYOffset: function () {
          return l.$a(this.$0);
        },
        get_clientWidth: function () {
          return l.$4(this.$0);
        },
        get_clientHeight: function () {
          return l.$3(this.$0);
        },
        get_innerWidth: function () {
          return l.$6(this.$0);
        },
        get_outerWidth: function () {
          return l.$8(this.$0);
        },
        get_innerHeight: function () {
          return l.$5(this.$0);
        },
        get_outerHeight: function () {
          return l.$7(this.$0);
        },
        get_screenLeft: function () {
          return l.$b(this.$0);
        },
        get_screenTop: function () {
          return l.$c(this.$0);
        },
        isQuirksMode: function () {
          return document.compatMode === 'BackCompat';
        },
      },
      {
        get_windowSelf: function () {
          return window.self;
        },
        get_windowParent: function () {
          return window.parent;
        },
        get_selection: function () {
          if (typeof window['getSelection'] === 'function') {
            return window.getSelection();
          }
          if (typeof document['getSelection'] === 'function') {
            return document.getSelection();
          }
          return null;
        },
        close: function (m) {
          m.close();
        },
        getOpener: function (m) {
          return m.opener;
        },
        getLocation: function (m) {
          return m.location;
        },
        getOrigin: function (m, n) {
          return (
            m.location.protocol +
            '//' +
            (n ? m.location.host : m.location.hostname)
          );
        },
        getPathAndSearch: function (m) {
          return m.location.pathname + m.location.search;
        },
        setLocationHref: function (m, n) {
          m.location.href = n;
        },
        locationReplace: function (m, n) {
          m.location.replace(n);
        },
        open: function (m, n, o) {
          return window.open(m, n, o);
        },
        reload: function (m, n) {
          m.location.reload(n);
        },
        requestAnimationFrame: function (m) {
          return l.$d(m);
        },
        cancelAnimationFrame: function (m) {
          if (ss.isValue(m)) {
            l.$2(m);
          }
        },
        setTimeout: function (m, n) {
          return window.setTimeout(m, n);
        },
        setInterval: function (m, n) {
          return window.setInterval(m, n);
        },
        addListener: function (m, n, o) {
          if ('addEventListener' in m) {
            m.addEventListener(n, o, false);
          } else {
            m.attachEvent('on' + n, o);
          }
        },
        removeListener: function (m, n, o) {
          if ('removeEventListener' in m) {
            m.removeEventListener(n, o, false);
          } else {
            m.detachEvent('on' + n, o);
          }
        },
        $0: function () {
          var m = 0;
          l.$d = function (n) {
            var o = new Date().getTime();
            var p = Math.max(0, 16 - (o - m));
            m = o + p;
            var q = window.setTimeout(n, p);
            return q;
          };
        },
        clearSelection: function () {
          var m = l.get_selection();
          if (ss.isValue(m)) {
            if (typeof m['removeAllRanges'] === 'function') {
              m.removeAllRanges();
            } else if (typeof m['empty'] === 'function') {
              m['empty']();
            }
          }
        },
      }
    ));
    ss.initClass(b);
    ss.initClass(c, b);
    ss.initClass(d);
    ss.initClass(e);
    ss.initClass(f);
    ss.initClass(g);
    ss.initClass(i);
    ss.initClass(j);
    ss.initClass(k);
    ss.initClass(l);
    (function () {
      g.global = g.getLoggerWithName('global');
      g.loggerLevelNames = [];
      g.$5 = ':log';
      g.$3 = [];
      g.$4 = [];
      g.$6 = new g('');
      g.loggerLevelNames[0] = 'all';
      g.loggerLevelNames[1] = 'debug';
      g.loggerLevelNames[2] = 'info';
      g.loggerLevelNames[3] = 'warn';
      g.loggerLevelNames[4] = 'error';
      g.loggerLevelNames[5] = 'off';
    })();
    (function () {
      c.globalAppender = new f(function () {
        return new c();
      });
    })();
    (function () {
      l.blank = '_blank';
      l.$6 = null;
      l.$5 = null;
      l.$4 = null;
      l.$3 = null;
      l.$9 = null;
      l.$a = null;
      l.$b = null;
      l.$c = null;
      l.$8 = null;
      l.$7 = null;
      l.$d = null;
      l.$2 = null;
      if ('innerWidth' in window) {
        l.$6 = function (u) {
          return u.innerWidth;
        };
      } else {
        l.$6 = function (u) {
          return u.document.documentElement.offsetWidth;
        };
      }
      if ('outerWidth' in window) {
        l.$8 = function (u) {
          return u.outerWidth;
        };
      } else {
        l.$8 = l.$6;
      }
      if ('innerHeight' in window) {
        l.$5 = function (u) {
          return u.innerHeight;
        };
      } else {
        l.$5 = function (u) {
          return u.document.documentElement.offsetHeight;
        };
      }
      if ('outerHeight' in window) {
        l.$7 = function (u) {
          return u.outerHeight;
        };
      } else {
        l.$7 = l.$5;
      }
      if ('clientWidth' in window) {
        l.$4 = function (u) {
          return u['clientWidth'];
        };
      } else {
        l.$4 = function (u) {
          return u.document.documentElement.clientWidth;
        };
      }
      if ('clientHeight' in window) {
        l.$3 = function (u) {
          return u['clientHeight'];
        };
      } else {
        l.$3 = function (u) {
          return u.document.documentElement.clientHeight;
        };
      }
      if (ss.isValue(window.self.pageXOffset)) {
        l.$9 = function (u) {
          return u.pageXOffset;
        };
      } else {
        l.$9 = function (u) {
          return u.document.documentElement.scrollLeft;
        };
      }
      if (ss.isValue(window.self.pageYOffset)) {
        l.$a = function (u) {
          return u.pageYOffset;
        };
      } else {
        l.$a = function (u) {
          return u.document.documentElement.scrollTop;
        };
      }
      if ('screenLeft' in window) {
        l.$b = function (u) {
          return u.screenLeft;
        };
      } else {
        l.$b = function (u) {
          return u.screenX;
        };
      }
      if ('screenTop' in window) {
        l.$c = function (u) {
          return u.screenTop;
        };
      } else {
        l.$c = function (u) {
          return u.screenY;
        };
      }
      {
        var m = 'requestAnimationFrame';
        var n = 'cancelAnimationFrame';
        var o = ['ms', 'moz', 'webkit', 'o'];
        var p = null;
        var q = null;
        if (m in window) {
          p = m;
        }
        if (n in window) {
          q = n;
        }
        for (
          var r = 0;
          r < o.length && (ss.isNullOrUndefined(p) || ss.isNullOrUndefined(q));
          ++r
        ) {
          var s = o[r];
          var t = s + 'RequestAnimationFrame';
          if (ss.isNullOrUndefined(p) && t in window) {
            p = t;
          }
          if (ss.isNullOrUndefined(q)) {
            t = s + 'CancelAnimationFrame';
            if (t in window) {
              q = t;
            }
            t = s + 'CancelRequestAnimationFrame';
            if (t in window) {
              q = t;
            }
          }
        }
        if (ss.isValue(p)) {
          l.$d = function (u) {
            return window[p](u);
          };
        } else {
          l.$0();
        }
        if (ss.isValue(q)) {
          l.$2 = function (u) {
            window[q](u);
          };
        } else {
          l.$2 = window.clearTimeout;
        }
      }
    })();
  })();
  var tab = global.tab;
  global.tableauSoftware = global.tableauSoftware || {};
  /*! BEGIN ApiShared */
  (function () {
    'dont use strict';
    var a = {};
    global.tab = global.tab || {};
    global.tableauSoftware = global.tableauSoftware || {};
    ss.initAssembly(a, 'vqlapishared');
    var b = (global.tab._ApiCommand = ss.mkType(
      a,
      'tab._ApiCommand',
      function (e, bj, bk, bl) {
        this.$1$1 = null;
        this.$1$2 = null;
        this.$1$3 = null;
        this.$1$4 = null;
        this.set_name(e);
        this.set_commandId(bj);
        this.set_hostId(bk);
        this.set_parameters(bl);
      },
      {
        get_name: function () {
          return this.$1$1;
        },
        set_name: function (e) {
          this.$1$1 = e;
        },
        get_hostId: function () {
          return this.$1$2;
        },
        set_hostId: function (e) {
          this.$1$2 = e;
        },
        get_commandId: function () {
          return this.$1$3;
        },
        set_commandId: function (e) {
          this.$1$3 = e;
        },
        get_parameters: function () {
          return this.$1$4;
        },
        set_parameters: function (e) {
          this.$1$4 = e;
        },
        get_isApiCommandName: function () {
          return this.get_rawName().indexOf('api.', 0) === 0;
        },
        get_isApiEventName: function () {
          return (
            this.get_isApiCommandName() &&
            ss.endsWithString(this.get_rawName(), 'Event')
          );
        },
        get_rawName: function () {
          return this.get_name().toString();
        },
        serialize: function () {
          var e = [];
          e.push(this.get_name());
          e.push(this.get_commandId());
          e.push(this.get_hostId());
          if (ss.isValue(this.get_parameters())) {
            e.push(this.get_parameters());
          }
          var bj = e.join(',');
          return bj;
        },
      },
      {
        generateNextCommandId: function () {
          var e = 'cmd' + b.$0;
          b.$0++;
          return e;
        },
        parse: function (e) {
          var bj;
          var bk = e.indexOf(String.fromCharCode(44));
          if (bk < 0) {
            bj = e;
            return new b(bj, null, null, null);
          }
          bj = e.substr(0, bk);
          var bl;
          var bm = e.substr(bk + 1);
          bk = bm.indexOf(String.fromCharCode(44));
          if (bk < 0) {
            bl = bm;
            return new b(bj, bl, null, null);
          }
          bl = bm.substr(0, bk);
          var bn;
          var bo = bm.substr(bk + 1);
          bk = bo.indexOf(String.fromCharCode(44));
          if (bk < 0) {
            bn = bo;
            return new b(bj, bl, bn, null);
          }
          bn = bo.substr(0, bk);
          var bp = bo.substr(bk + 1);
          return new b(bj, bl, bn, bp);
        },
      }
    ));
    var c = (global.tab._ApiObjectRegistry = ss.mkType(
      a,
      'tab._ApiObjectRegistry',
      null,
      null,
      {
        registerApiMessageRouter: function (e) {
          return c.$3(Object).call(null, e);
        },
        getApiMessageRouter: function () {
          return c.$2(Object).call(null);
        },
        disposeApiMessageRouter: function () {
          c.$0(Object).call(null);
        },
        $3: function (e) {
          return function (bj) {
            var bk = window._ApiObjectRegistryGlobalState.creationRegistry;
            var bl = ss.getTypeFullName(e);
            var bm = bk[bl];
            bk[bl] = bj;
            return bm;
          };
        },
        $1: function (e) {
          return function () {
            var bj = ss.getTypeFullName(e);
            var bk = window._ApiObjectRegistryGlobalState.creationRegistry;
            var bl = bk[bj];
            if (ss.isNullOrUndefined(bl)) {
              throw o.createInternalError(
                "No creation function has been registered for interface type '" +
                  bj +
                  "'."
              );
            }
            var bm = bl();
            return bm;
          };
        },
        $2: function (e) {
          return function () {
            var bj =
              window._ApiObjectRegistryGlobalState.singletonInstanceRegistry;
            var bk = ss.getTypeFullName(e);
            var bl = bj[bk];
            if (ss.isNullOrUndefined(bl)) {
              bl = c.$1(e).call(null);
              bj[bk] = bl;
            }
            return bl;
          };
        },
        $0: function (e) {
          return function () {
            var bj =
              window._ApiObjectRegistryGlobalState.singletonInstanceRegistry;
            var bk = ss.getTypeFullName(e);
            var bl = bj[bk];
            delete bj[bk];
            return bl;
          };
        },
      }
    ));
    var d = (global.tab._ApiServerNotification = ss.mkType(
      a,
      'tab._ApiServerNotification',
      function (e, bj, bk) {
        this.$1 = null;
        this.$2 = null;
        this.$0 = null;
        this.$1 = e;
        this.$2 = bj;
        this.$0 = bk;
      },
      {
        get_workbookName: function () {
          return this.$1;
        },
        get_worksheetName: function () {
          return this.$2;
        },
        get_data: function () {
          return this.$0;
        },
        serialize: function () {
          var e = {};
          e['api.workbookName'] = this.$1;
          e['api.worksheetName'] = this.$2;
          e['api.commandData'] = this.$0;
          return JSON.stringify(e);
        },
      },
      {
        deserialize: function (e) {
          var bj = JSON.parse(e);
          var bk = bj['api.workbookName'];
          var bl = bj['api.worksheetName'];
          var bm = bj['api.commandData'];
          return new d(bk, bl, bm);
        },
      }
    ));
    var f = (global.tab._ApiServerResultParser = ss.mkType(
      a,
      'tab._ApiServerResultParser',
      function (e) {
        this.$1 = null;
        this.$0 = null;
        var bj = JSON.parse(e);
        this.$1 = bj['api.commandResult'];
        this.$0 = bj['api.commandData'];
      },
      {
        get_result: function () {
          return this.$1;
        },
        get_data: function () {
          return this.$0;
        },
      }
    ));
    var g = (global.tab._CollectionImpl = ss.mkType(
      a,
      'tab._CollectionImpl',
      function () {
        this.$4 = [];
        this.$3 = {};
      },
      {
        get__length: function () {
          return this.$4.length;
        },
        get__rawArray: function () {
          return this.$4;
        },
        get_item: function (e) {
          return this.$4[e];
        },
        _get: function (e) {
          var bj = this.$0(e);
          if (ss.isValue(this.$3[bj])) {
            return this.$3[bj];
          }
          return undefined;
        },
        _has: function (e) {
          return ss.isValue(this._get(e));
        },
        _add: function (e, bj) {
          this.$1(e, bj);
          var bk = this.$0(e);
          this.$4.push(bj);
          this.$3[bk] = bj;
        },
        _addToFirst: function (e, bj) {
          this.$1(e, bj);
          var bk = this.$0(e);
          this.$4.unshift(bj);
          this.$3[bk] = bj;
        },
        _remove: function (e) {
          var bj = this.$0(e);
          if (ss.isValue(this.$3[bj])) {
            var bk = this.$3[bj];
            delete this.$3[bj];
            for (var bl = 0; bl < this.$4.length; bl++) {
              if (ss.referenceEquals(this.$4[bl], bk)) {
                this.$4.splice(bl, 1);
                break;
              }
            }
          }
        },
        _toApiCollection: function () {
          var e = this.$4.concat();
          e.get = ss.mkdel(this, function (bj) {
            return this._get(bj);
          });
          e.has = ss.mkdel(this, function (bj) {
            return this._has(bj);
          });
          return e;
        },
        $2: function (e) {
          if (p.isNullOrEmpty(e)) {
            throw new ss.Exception('Null key');
          }
          if (this._has(e)) {
            throw new ss.Exception("Duplicate key '" + e + "'");
          }
        },
        $1: function (e, bj) {
          this.$2(e);
          if (ss.isNullOrUndefined(bj)) {
            throw new ss.Exception('Null item');
          }
        },
        $0: function (e) {
          return '_' + e;
        },
      }
    ));
    var h = (global.tab._ColumnImpl = ss.mkType(
      a,
      'tab._ColumnImpl',
      function (e, bj, bk, bl) {
        this.$1 = null;
        this.$0 = null;
        this.$3 = false;
        this.$2 = 0;
        l.verifyString(e, 'Column Field Name');
        this.$1 = e;
        this.$0 = bj;
        this.$3 = ss.coalesce(bk, false);
        this.$2 = bl;
      },
      {
        get_fieldName: function () {
          return this.$1;
        },
        get_dataType: function () {
          return this.$0;
        },
        get_isReferenced: function () {
          return this.$3;
        },
        get_index: function () {
          return this.$2;
        },
      }
    ));
    var i = (global.tab._DataTableImpl = ss.mkType(
      a,
      'tab._DataTableImpl',
      function (e, bj, bk, bl) {
        this.$2 = null;
        this.$3 = null;
        this.$4 = 0;
        this.$0 = null;
        this.$1 = false;
        this.$3 = e;
        this.$4 = bk;
        this.$0 = bl;
        this.$1 = bj;
        this.$2 = bj ? 'Summary Data Table' : 'Underlying Data Table';
      },
      {
        get_name: function () {
          return this.$2;
        },
        get_rows: function () {
          return this.$3;
        },
        get_columns: function () {
          return this.$0;
        },
        get_totalRowCount: function () {
          return this.$4;
        },
        get_isSummaryData: function () {
          return this.$1;
        },
      }
    ));
    var j = (global.tab._DeferredImpl = ss.mkType(
      a,
      'tab._DeferredImpl',
      function () {
        this.$3 = null;
        this.$5 = null;
        this.$2 = [];
        this.$4 = null;
        this.$3 = new m(ss.mkdel(this, this.then));
        this.$5 = ss.mkdel(this, this.$0);
        this.$4 = ss.mkdel(this, this.$1);
      },
      {
        get_promise: function () {
          return this.$3;
        },
        all: function (e) {
          var bj = new j();
          var bk = e.length;
          var bl = bk;
          var bm = [];
          if (bk === 0) {
            bj.resolve(bm);
            return bj.get_promise();
          }
          var bn = function (bp, bq) {
            var br = r.$0(bp);
            br.then(
              function (bs) {
                bm[bq] = bs;
                bl--;
                if (bl === 0) {
                  bj.resolve(bm);
                }
                return null;
              },
              function (bs) {
                bj.reject(bs);
                return null;
              }
            );
          };
          for (var bo = 0; bo < bk; bo++) {
            bn(e[bo], bo);
          }
          return bj.get_promise();
        },
        then: function (e, bj) {
          return this.$5(e, bj);
        },
        resolve: function (e) {
          return this.$4(e);
        },
        reject: function (e) {
          return this.$4(r.$3(e));
        },
        $0: function (e, bj) {
          var bk = new j();
          this.$2.push(function (bl) {
            bl.then(e, bj).then(
              ss.mkdel(bk, bk.resolve),
              ss.mkdel(bk, bk.reject)
            );
          });
          return bk.get_promise();
        },
        $1: function (e) {
          var bj = r.$0(e);
          this.$5 = bj.then;
          this.$4 = r.$0;
          for (var bk = 0; bk < this.$2.length; bk++) {
            var bl = this.$2[bk];
            bl(bj);
          }
          this.$2 = null;
          return bj;
        },
      }
    ));
    var k = (global.tab._jQueryShim = ss.mkType(
      a,
      'tab._jQueryShim',
      null,
      null,
      {
        isFunction: function (e) {
          return k.type(e) === 'function';
        },
        isArray: function (e) {
          if (ss.isValue(Array['isArray'])) {
            return Array['isArray'](e);
          }
          return k.type(e) === 'array';
        },
        type: function (e) {
          return ss.isNullOrUndefined(e)
            ? String(e)
            : k.$9[k.$e.call(e)] || 'object';
        },
        trim: function (e) {
          if (ss.isValue(k.$f)) {
            return ss.isNullOrUndefined(e) ? '' : k.$f.call(e);
          }
          return ss.isNullOrUndefined(e)
            ? ''
            : e.toString().replace(k.$g, '').replace(k.$h, '');
        },
        parseJSON: function (e) {
          if (typeof e !== 'string' || ss.isNullOrUndefined(e)) {
            return null;
          }
          e = k.trim(e);
          if (ss.isValue(JSON) && ss.isValue(JSON['parse'])) {
            return JSON.parse(e);
          }
          if (
            k.$b.test(e.replace(k.$c, '@').replace(k.$d, ']').replace(k.$a, ''))
          ) {
            return new Function('return ' + e)();
          }
          throw new ss.Exception('Invalid JSON: ' + e);
        },
      }
    ));
    var l = (global.tab._Param = ss.mkType(a, 'tab._Param', null, null, {
      verifyString: function (e, bj) {
        if (ss.isNullOrUndefined(e) || e.length === 0) {
          throw o.createInternalStringArgumentException(bj);
        }
      },
      verifyStringMaxLength: function (e, bj) {
        if (e.length > 128) {
          throw o.createMaxCharStringArgumentException(bj, 128);
        }
      },
      verifyValue: function (e, bj) {
        if (ss.isNullOrUndefined(e)) {
          throw o.createInternalNullArgumentException(bj);
        }
      },
    }));
    var m = (global.tab._PromiseImpl = ss.mkType(
      a,
      'tab._PromiseImpl',
      function (e) {
        this.then = null;
        this.then = e;
      },
      {
        always: function (e) {
          return this.then(e, e);
        },
        otherwise: function (e) {
          return this.then(null, e);
        },
      }
    ));
    var n = (global.tab._Rect = ss.mkType(
      a,
      'tab._Rect',
      function (e, bj, bk, bl) {
        this.left = 0;
        this.top = 0;
        this.width = 0;
        this.height = 0;
        this.left = e;
        this.top = bj;
        this.width = bk;
        this.height = bl;
      },
      {
        intersect: function (e) {
          var bj = Math.max(this.left, e.left);
          var bk = Math.max(this.top, e.top);
          var bl = Math.min(this.left + this.width, e.left + e.width);
          var bm = Math.min(this.top + this.height, e.top + e.height);
          if (bl <= bj || bm <= bk) {
            return new n(0, 0, 0, 0);
          }
          return new n(bj, bk, bl - bj, bm - bk);
        },
      }
    ));
    var o = (global.tab._TableauException = ss.mkType(
      a,
      'tab._TableauException',
      null,
      null,
      {
        create: function (e, bj) {
          var bk = new ss.Exception(bj);
          bk['tableauSoftwareErrorCode'] = e;
          return bk;
        },
        createInternalError: function (e) {
          if (ss.isValue(e)) {
            return o.create(
              'internalError',
              'Internal error. Please contact Tableau support with the following information: ' +
                e
            );
          } else {
            return o.create(
              'internalError',
              'Internal error. Please contact Tableau support'
            );
          }
        },
        createInternalNullArgumentException: function (e) {
          return o.createInternalError("Null/undefined argument '" + e + "'.");
        },
        createInternalStringArgumentException: function (e) {
          return o.createInternalError("Invalid string argument '" + e + "'.");
        },
        createMaxCharStringArgumentException: function (e, bj) {
          return o.createInternalError(
            "Argument '" + e + "' exceeds char limit of '" + bj + "'."
          );
        },
        createServerError: function (e) {
          return o.create('serverError', e);
        },
        createNotActiveSheet: function () {
          return o.create(
            'notActiveSheet',
            'Operation not allowed on non-active sheet'
          );
        },
        createInvalidCustomViewName: function (e) {
          return o.create(
            'invalidCustomViewName',
            'Invalid custom view name: ' + e
          );
        },
        createInvalidParameter: function (e) {
          return o.create('invalidParameter', 'Invalid parameter: ' + e);
        },
        createInvalidFilterFieldNameOrValue: function (e) {
          return o.create(
            'invalidFilterFieldNameOrValue',
            'Invalid filter field name or value: ' + e
          );
        },
        createInvalidDateParameter: function (e) {
          return o.create(
            'invalidDateParameter',
            'Invalid date parameter: ' + e
          );
        },
        createNullOrEmptyParameter: function (e) {
          return o.create(
            'nullOrEmptyParameter',
            'Parameter cannot be null or empty: ' + e
          );
        },
        createMissingMaxSize: function () {
          return o.create(
            'missingMaxSize',
            'Missing maxSize for SheetSizeBehavior.ATMOST'
          );
        },
        createMissingMinSize: function () {
          return o.create(
            'missingMinSize',
            'Missing minSize for SheetSizeBehavior.ATLEAST'
          );
        },
        createMissingMinMaxSize: function () {
          return o.create(
            'missingMinMaxSize',
            'Missing minSize or maxSize for SheetSizeBehavior.RANGE'
          );
        },
        createInvalidRangeSize: function () {
          return o.create(
            'invalidSize',
            'Missing minSize or maxSize for SheetSizeBehavior.RANGE'
          );
        },
        createInvalidSizeValue: function () {
          return o.create('invalidSize', 'Size value cannot be less than zero');
        },
        createInvalidSheetSizeParam: function () {
          return o.create('invalidSize', 'Invalid sheet size parameter');
        },
        createSizeConflictForExactly: function () {
          return o.create(
            'invalidSize',
            'Conflicting size values for SheetSizeBehavior.EXACTLY'
          );
        },
        createInvalidSizeBehaviorOnWorksheet: function () {
          return o.create(
            'invalidSizeBehaviorOnWorksheet',
            'Only SheetSizeBehavior.AUTOMATIC is allowed on Worksheets'
          );
        },
        createNoUrlForHiddenWorksheet: function () {
          return o.create(
            'noUrlForHiddenWorksheet',
            'Hidden worksheets do not have a URL.'
          );
        },
        createInvalidAggregationFieldName: function (e) {
          return o.create(
            'invalidAggregationFieldName',
            "Invalid aggregation type for field '" + e + "'"
          );
        },
        createInvalidToolbarButtonName: function (e) {
          return o.create(
            'invalidToolbarButtonName',
            "Invalid toolbar button name: '" + e + "'"
          );
        },
        createIndexOutOfRange: function (e) {
          return o.create(
            'indexOutOfRange',
            "Index '" + e + "' is out of range."
          );
        },
        createUnsupportedEventName: function (e) {
          return o.create(
            'unsupportedEventName',
            "Unsupported event '" + e + "'."
          );
        },
        createBrowserNotCapable: function () {
          return o.create(
            'browserNotCapable',
            'This browser is incapable of supporting the Tableau JavaScript API.'
          );
        },
      }
    ));
    var p = (global.tab._Utility = ss.mkType(a, 'tab._Utility', null, null, {
      isNullOrEmpty: function (e) {
        return ss.isNullOrUndefined(e) || (e['length'] || 0) <= 0;
      },
      isString: function (e) {
        return typeof e === 'string';
      },
      isNumber: function (e) {
        return typeof e === 'number';
      },
      isDate: function (e) {
        if (typeof e === 'object' && ss.isInstanceOfType(e, ss.JsDate)) {
          return true;
        } else if (Object.prototype.toString.call(e) !== '[object Date]') {
          return false;
        }
        return !isNaN(e.getTime());
      },
      isDateValid: function (e) {
        return !isNaN(e.getTime());
      },
      indexOf: function (e, bj, bk) {
        if (ss.isValue(Array.prototype['indexOf'])) {
          return e['indexOf'](bj, bk);
        }
        bk = bk || 0;
        var bl = e.length;
        if (bl > 0) {
          for (var bm = bk; bm < bl; bm++) {
            if (ss.referenceEquals(e[bm], bj)) {
              return bm;
            }
          }
        }
        return -1;
      },
      contains: function (e, bj, bk) {
        var bl = p.indexOf(e, bj, bk);
        return bl >= 0;
      },
      getTopmostWindow: function () {
        var e = window.self;
        while (ss.isValue(e.parent) && !ss.referenceEquals(e.parent, e)) {
          e = e.parent;
        }
        return e;
      },
      toInt: function (e) {
        if (p.isNumber(e)) {
          return ss.trunc(e);
        }
        var bj = parseInt(e.toString(), 10);
        if (isNaN(bj)) {
          return 0;
        }
        return bj;
      },
      hasClass: function (e, bj) {
        var bk = new RegExp('[\\n\\t\\r]', 'g');
        return (
          ss.isValue(e) &&
          (' ' + e.className + ' ').replace(bk, ' ').indexOf(' ' + bj + ' ') >
            -1
        );
      },
      findParentWithClassName: function (e, bj, bk) {
        var bl = ss.isValue(e) ? e.parentNode : null;
        bk = bk || document.body;
        while (ss.isValue(bl)) {
          if (p.hasClass(bl, bj)) {
            return bl;
          }
          if (ss.referenceEquals(bl, bk)) {
            bl = null;
          } else {
            bl = bl.parentNode;
          }
        }
        return bl;
      },
      hasJsonParse: function () {
        return ss.isValue(JSON) && ss.isValue(JSON.parse);
      },
      hasWindowPostMessage: function () {
        return ss.isValue(window.postMessage);
      },
      isPostMessageSynchronous: function () {
        if (p.isIE()) {
          var e = new RegExp('(msie) ([\\w.]+)');
          var bj = e.exec(window.navigator.userAgent.toLowerCase());
          var bk = bj[2] || '0';
          var bl = parseInt(bk, 10);
          return bl <= 8;
        }
        return false;
      },
      hasDocumentAttachEvent: function () {
        return ss.isValue(document.attachEvent);
      },
      hasWindowAddEventListener: function () {
        return ss.isValue(window.addEventListener);
      },
      isElementOfTag: function (e, bj) {
        return (
          ss.isValue(e) &&
          e.nodeType === 1 &&
          ss.referenceEquals(e.tagName.toLowerCase(), bj.toLowerCase())
        );
      },
      elementToString: function (e) {
        var bj = new ss.StringBuilder();
        bj.append(e.tagName.toLowerCase());
        if (!p.isNullOrEmpty(e.id)) {
          bj.append('#').append(e.id);
        }
        if (!p.isNullOrEmpty(e.className)) {
          var bk = e.className.split(' ');
          bj.append('.').append(bk.join('.'));
        }
        return bj.toString();
      },
      tableauGCS: function (e) {
        if (typeof window['getComputedStyle'] === 'function') {
          return window.getComputedStyle(e);
        } else {
          return e['currentStyle'];
        }
      },
      isIE: function () {
        return (
          window.navigator.userAgent.indexOf('MSIE') > -1 &&
          ss.isNullOrUndefined(window.opera)
        );
      },
      isSafari: function () {
        var e = window.navigator.userAgent;
        var bj = e.indexOf('Chrome') >= 0;
        return e.indexOf('Safari') >= 0 && !bj;
      },
      mobileDetect: function () {
        var e = window.navigator.userAgent;
        if (e.indexOf('iPad') !== -1) {
          return true;
        }
        if (e.indexOf('Android') !== -1) {
          return true;
        }
        if (e.indexOf('AppleWebKit') !== -1 && e.indexOf('Mobile') !== -1) {
          return true;
        }
        return false;
      },
      visibleContentRectInDocumentCoordinates: function (e) {
        var bj = p.contentRectInDocumentCoordinates(e);
        for (
          var bk = e.parentElement;
          ss.isValue(bk) && ss.isValue(bk.parentElement);
          bk = bk.parentElement
        ) {
          var bl = p.$0(bk).overflow;
          if (bl === 'auto' || bl === 'scroll' || bl === 'hidden') {
            bj = bj.intersect(p.contentRectInDocumentCoordinates(bk));
          }
        }
        var bm = p.$1();
        return bj.intersect(bm);
      },
      getVisualViewportRect: function (e) {
        var bj = e.visualViewport;
        if (ss.isValue(bj)) {
          return new n(
            ss.trunc(bj.pageLeft),
            ss.trunc(bj.pageTop),
            ss.trunc(bj.width),
            ss.trunc(bj.height)
          );
        } else {
          return null;
        }
      },
      $1: function () {
        var e = p.getVisualViewportRect(window.self);
        if (ss.isValue(e)) {
          return e;
        } else {
          var bj = p.contentRectInDocumentCoordinates(document.documentElement);
          var bk = new tab.WindowHelper(window.self);
          if (bk.isQuirksMode()) {
            bj.height = document.body.clientHeight - bj.left;
            bj.width = document.body.clientWidth - bj.top;
          }
          bj.left += bk.get_pageXOffset();
          bj.top += bk.get_pageYOffset();
          return bj;
        }
      },
      contentRectInDocumentCoordinates: function (e) {
        var bj = p.getBoundingClientRect(e);
        var bk = p.$0(e);
        var bl = p.toInt(bk.paddingLeft);
        var bm = p.toInt(bk.paddingTop);
        var bn = p.toInt(bk.borderLeftWidth);
        var bo = p.toInt(bk.borderTopWidth);
        var bp = p.computeContentSize(e);
        var bq = new tab.WindowHelper(window.self);
        var br = bj.left + bl + bn + bq.get_pageXOffset();
        var bs = bj.top + bm + bo + bq.get_pageYOffset();
        return new n(br, bs, bp.width, bp.height);
      },
      getBoundingClientRect: function (e) {
        var bj = e.getBoundingClientRect();
        var bk = ss.trunc(bj.top);
        var bl = ss.trunc(bj.left);
        var bm = ss.trunc(bj.right);
        var bn = ss.trunc(bj.bottom);
        return new n(bl, bk, bm - bl, bn - bk);
      },
      convertRawValue: function (e, bj) {
        if (ss.isNullOrUndefined(e)) {
          return null;
        }
        switch (bj) {
          case 'bool': {
            return e;
          }
          case 'date':
          case 'number': {
            if (ss.isNullOrUndefined(e)) {
              return Number.NaN;
            }
            return e;
          }
          default:
          case 'string': {
            return e;
          }
        }
      },
      getDataValue: function (e) {
        if (ss.isNullOrUndefined(e)) {
          return R.$ctor(null, null, null);
        }
        return R.$ctor(
          p.convertRawValue(e.value, e.type),
          e.formattedValue,
          e.aliasedValue
        );
      },
      serializeDateForServer: function (e) {
        var bj = '';
        if (ss.isValue(e) && p.isDate(e)) {
          var bk = e.getUTCFullYear();
          var bl = e.getUTCMonth() + 1;
          var bm = e.getUTCDate();
          var bn = e.getUTCHours();
          var bo = e.getUTCMinutes();
          var bp = e.getUTCSeconds();
          bj = bk + '-' + bl + '-' + bm + ' ' + bn + ':' + bo + ':' + bp;
        }
        return bj;
      },
      computeContentSize: function (e) {
        var bj = p.$0(e);
        var bk = parseFloat(bj.paddingLeft);
        var bl = parseFloat(bj.paddingTop);
        var bm = parseFloat(bj.paddingRight);
        var bn = parseFloat(bj.paddingBottom);
        var bo = e.clientWidth - Math.round(bk + bm);
        var bp = e.clientHeight - Math.round(bl + bn);
        return bd.$ctor(bo, bp);
      },
      $0: function (e) {
        if (typeof window['getComputedStyle'] === 'function') {
          if (ss.isValue(e.ownerDocument.defaultView.opener)) {
            return e.ownerDocument.defaultView.getComputedStyle(e);
          }
          return window.getComputedStyle(e);
        } else if (ss.isValue(e['currentStyle'])) {
          return e['currentStyle'];
        }
        return e.style;
      },
      roundVizSizeInPixels: function (e) {
        if (ss.isNullOrUndefined(e) || !(e.indexOf('px') !== -1)) {
          return e;
        }
        var bj = parseFloat(e.split('px')[0]);
        return Math.round(bj) + 'px';
      },
      noResultPromiseHelper: function (e, bj, bk) {
        var bl = new tab._Deferred();
        var bm = new (ss.makeGenericType(O, [Object]))(
          e,
          1,
          function (bn) {
            bl.resolve();
          },
          function (bn, bo) {
            bl.reject(o.createServerError(bo));
          }
        );
        bk.sendCommand(Object).call(bk, bj, bm);
        return bl.get_promise();
      },
      clone: function (e) {
        return function (bj) {
          return JSON.parse(JSON.stringify(bj));
        };
      },
    }));
    var q = ss.mkType(
      a,
      'tab.$0',
      function () {
        this.$2 = null;
        this.$1$1 = null;
      },
      {
        add_stateReadyForQuery: function (e) {
          this.$1$1 = ss.delegateCombine(this.$1$1, e);
        },
        remove_stateReadyForQuery: function (e) {
          this.$1$1 = ss.delegateRemove(this.$1$1, e);
        },
        get_iframe: function () {
          return null;
        },
        get_hostId: function () {
          return this.$2;
        },
        set_hostId: function (e) {
          this.$2 = e;
        },
        $0: function () {
          return '*';
        },
        handleEventNotification: function (e, bj) {},
        $1: function () {
          this.$1$1(null);
        },
      }
    );
    var r = ss.mkType(a, 'tab.$1', null, null, {
      $0: function (e) {
        var bj;
        if (e instanceof tableauSoftware.Promise) {
          bj = e;
        } else {
          if (ss.isValue(e) && typeof e['valueOf'] === 'function') {
            e = e['valueOf']();
          }
          if (r.$1(e)) {
            var bk = new j();
            e.then(ss.mkdel(bk, bk.resolve), ss.mkdel(bk, bk.reject));
            bj = bk.get_promise();
          } else {
            bj = r.$4(e);
          }
        }
        return bj;
      },
      $2: function (e) {
        return r.$0(e).then(function (bj) {
          return r.$3(bj);
        }, null);
      },
      $4: function (bj) {
        var bk = new m(function (bl, bm) {
          try {
            return r.$0(ss.isValue(bl) ? bl(bj) : bj);
          } catch (bn) {
            var e = ss.Exception.wrap(bn);
            return r.$3(e);
          }
        });
        return bk;
      },
      $3: function (bj) {
        var bk = new m(function (bl, bm) {
          try {
            return ss.isValue(bm) ? r.$0(bm(bj)) : r.$3(bj);
          } catch (bn) {
            var e = ss.Exception.wrap(bn);
            return r.$3(e);
          }
        });
        return bk;
      },
      $1: function (e) {
        return ss.isValue(e) && typeof e['then'] === 'function';
      },
    });
    var s = (global.tab.ApiDashboardObjectType = ss.mkEnum(
      a,
      'tab.ApiDashboardObjectType',
      {
        blank: 'blank',
        worksheet: 'worksheet',
        quickFilter: 'quickFilter',
        parameterControl: 'parameterControl',
        pageFilter: 'pageFilter',
        legend: 'legend',
        title: 'title',
        text: 'text',
        image: 'image',
        webPage: 'webPage',
        addIn: 'addIn',
      },
      true
    ));
    var t = (global.tab.ApiDateRangeType = ss.mkEnum(
      a,
      'tab.ApiDateRangeType',
      {
        last: 'last',
        lastn: 'lastn',
        next: 'next',
        nextn: 'nextn',
        curr: 'curr',
        todate: 'todate',
      },
      true
    ));
    var u = (global.tab.ApiDeviceType = ss.mkEnum(
      a,
      'tab.ApiDeviceType',
      {
        default: 'default',
        desktop: 'desktop',
        tablet: 'tablet',
        phone: 'phone',
      },
      true
    ));
    var v = (global.tab.ApiEnumConverter = ss.mkType(
      a,
      'tab.ApiEnumConverter',
      null,
      null,
      {
        convertDashboardObjectType: function (e) {
          switch (e) {
            case 'blank': {
              return 'blank';
            }
            case 'image': {
              return 'image';
            }
            case 'legend': {
              return 'legend';
            }
            case 'pageFilter': {
              return 'pageFilter';
            }
            case 'parameterControl': {
              return 'parameterControl';
            }
            case 'quickFilter': {
              return 'quickFilter';
            }
            case 'text': {
              return 'text';
            }
            case 'title': {
              return 'title';
            }
            case 'webPage': {
              return 'webPage';
            }
            case 'worksheet': {
              return 'worksheet';
            }
            default: {
              throw o.createInternalError(
                'Unknown ApiCrossDomainDashboardObjectType: ' + e
              );
            }
          }
        },
        convertDateRange: function (e) {
          switch (e) {
            case 'curr': {
              return 'curr';
            }
            case 'last': {
              return 'last';
            }
            case 'lastn': {
              return 'lastn';
            }
            case 'next': {
              return 'next';
            }
            case 'nextn': {
              return 'nextn';
            }
            case 'todate': {
              return 'todate';
            }
            default: {
              throw o.createInternalError(
                'Unknown ApiCrossDomainDateRangeType: ' + e
              );
            }
          }
        },
        convertFieldAggregation: function (e) {
          switch (e) {
            case 'ATTR': {
              return 'ATTR';
            }
            case 'AVG': {
              return 'AVG';
            }
            case 'COLLECT': {
              return 'COLLECT';
            }
            case 'COUNT': {
              return 'COUNT';
            }
            case 'COUNTD': {
              return 'COUNTD';
            }
            case 'DAY': {
              return 'DAY';
            }
            case 'END': {
              return 'END';
            }
            case 'HOUR': {
              return 'HOUR';
            }
            case 'INOUT': {
              return 'INOUT';
            }
            case 'KURTOSIS': {
              return 'KURTOSIS';
            }
            case 'MAX': {
              return 'MAX';
            }
            case 'MDY': {
              return 'MDY';
            }
            case 'MEDIAN': {
              return 'MEDIAN';
            }
            case 'MIN': {
              return 'MIN';
            }
            case 'MINUTE': {
              return 'MINUTE';
            }
            case 'MONTH': {
              return 'MONTH';
            }
            case 'MONTHYEAR': {
              return 'MONTHYEAR';
            }
            case 'NONE': {
              return 'NONE';
            }
            case 'PERCENTILE': {
              return 'PERCENTILE';
            }
            case 'QUART1': {
              return 'QUART1';
            }
            case 'QUART3': {
              return 'QUART3';
            }
            case 'QTR': {
              return 'QTR';
            }
            case 'SECOND': {
              return 'SECOND';
            }
            case 'SKEWNESS': {
              return 'SKEWNESS';
            }
            case 'STDEV': {
              return 'STDEV';
            }
            case 'STDEVP': {
              return 'STDEVP';
            }
            case 'SUM': {
              return 'SUM';
            }
            case 'SUM_XSQR': {
              return 'SUM_XSQR';
            }
            case 'TRUNC_DAY': {
              return 'TRUNC_DAY';
            }
            case 'TRUNC_HOUR': {
              return 'TRUNC_HOUR';
            }
            case 'TRUNC_MINUTE': {
              return 'TRUNC_MINUTE';
            }
            case 'TRUNC_MONTH': {
              return 'TRUNC_MONTH';
            }
            case 'TRUNC_QTR': {
              return 'TRUNC_QTR';
            }
            case 'TRUNC_SECOND': {
              return 'TRUNC_SECOND';
            }
            case 'TRUNC_WEEK': {
              return 'TRUNC_WEEK';
            }
            case 'TRUNC_YEAR': {
              return 'TRUNC_YEAR';
            }
            case 'USER': {
              return 'USER';
            }
            case 'VAR': {
              return 'VAR';
            }
            case 'VARP': {
              return 'VARP';
            }
            case 'WEEK': {
              return 'WEEK';
            }
            case 'WEEKDAY': {
              return 'WEEKDAY';
            }
            case 'YEAR': {
              return 'YEAR';
            }
            default: {
              throw o.createInternalError(
                'Unknown ApiCrossDomainFieldAggregationType: ' + e
              );
            }
          }
        },
        convertFieldRole: function (e) {
          switch (e) {
            case 'dimension': {
              return 'dimension';
            }
            case 'measure': {
              return 'measure';
            }
            case 'unknown': {
              return 'unknown';
            }
            default: {
              throw o.createInternalError(
                'Unknown ApiCrossDomainFieldRoleType: ' + e
              );
            }
          }
        },
        convertFilterType: function (e) {
          switch (e) {
            case 'categorical': {
              return 'categorical';
            }
            case 'hierarchical': {
              return 'hierarchical';
            }
            case 'quantitative': {
              return 'quantitative';
            }
            case 'relativedate': {
              return 'relativedate';
            }
            default: {
              throw o.createInternalError(
                'Unknown ApiCrossDomainFilterType: ' + e
              );
            }
          }
        },
        convertParameterAllowableValuesType: function (e) {
          switch (e) {
            case 'all': {
              return 'all';
            }
            case 'list': {
              return 'list';
            }
            case 'range': {
              return 'range';
            }
            default: {
              throw o.createInternalError(
                'Unknown ApiCrossDomainParameterAllowableValuesType: ' + e
              );
            }
          }
        },
        convertParameterDataType: function (e) {
          switch (e) {
            case 'boolean': {
              return 'boolean';
            }
            case 'date': {
              return 'date';
            }
            case 'datetime': {
              return 'datetime';
            }
            case 'float': {
              return 'float';
            }
            case 'integer': {
              return 'integer';
            }
            case 'string': {
              return 'string';
            }
            default: {
              throw o.createInternalError(
                'Unknown ApiCrossDomainParameterDataType: ' + e
              );
            }
          }
        },
        convertPeriodType: function (e) {
          switch (e) {
            case 'year': {
              return 'year';
            }
            case 'quarter': {
              return 'quarter';
            }
            case 'month': {
              return 'month';
            }
            case 'week': {
              return 'week';
            }
            case 'day': {
              return 'day';
            }
            case 'hour': {
              return 'hour';
            }
            case 'minute': {
              return 'minute';
            }
            case 'second': {
              return 'second';
            }
            default: {
              throw o.createInternalError(
                'Unknown ApiCrossDomainPeriodType: ' + e
              );
            }
          }
        },
        convertSheetType: function (e) {
          switch (e) {
            case 'worksheet': {
              return 'worksheet';
            }
            case 'dashboard': {
              return 'dashboard';
            }
            case 'story': {
              return 'story';
            }
            default: {
              throw o.createInternalError(
                'Unknown ApiCrossDomainSheetType: ' + e
              );
            }
          }
        },
        convertDataType: function (e) {
          switch (e) {
            case 'boolean': {
              return 'boolean';
            }
            case 'date': {
              return 'date';
            }
            case 'datetime': {
              return 'datetime';
            }
            case 'float': {
              return 'float';
            }
            case 'integer': {
              return 'integer';
            }
            case 'string': {
              return 'string';
            }
            default: {
              throw o.createInternalError(
                'Unknown ApiCrossDomainParameterDataType: ' + e
              );
            }
          }
        },
      }
    ));
    var w = (global.tab.ApiErrorCode = ss.mkEnum(
      a,
      'tab.ApiErrorCode',
      {
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
        missingRangeNForRelativeDateFilters:
          'missingRangeNForRelativeDateFilters',
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
        maxVizResizeAttempts: 'maxVizResizeAttempts',
      },
      true
    ));
    var x = (global.tab.ApiFieldAggregationType = ss.mkEnum(
      a,
      'tab.ApiFieldAggregationType',
      {
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
        USER: 'USER',
        COLLECT: 'COLLECT',
      },
      true
    ));
    var y = (global.tab.ApiFieldRoleType = ss.mkEnum(
      a,
      'tab.ApiFieldRoleType',
      { dimension: 'dimension', measure: 'measure', unknown: 'unknown' },
      true
    ));
    var z = (global.tab.ApiFilterType = ss.mkEnum(
      a,
      'tab.ApiFilterType',
      {
        categorical: 'categorical',
        quantitative: 'quantitative',
        hierarchical: 'hierarchical',
        relativedate: 'relativedate',
      },
      true
    ));
    var A = (global.tab.ApiFilterUpdateType = ss.mkEnum(
      a,
      'tab.ApiFilterUpdateType',
      { all: 'all', replace: 'replace', add: 'add', remove: 'remove' },
      true
    ));
    var B = (global.tab.ApiMenuType = ss.mkEnum(
      a,
      'tab.ApiMenuType',
      { ubertip: 'ubertip' },
      true
    ));
    var C = (global.tab.ApiMessageHandler = ss.mkType(
      a,
      'tab.ApiMessageHandler',
      function () {},
      {
        handleEventNotification: function (e, bj) {
          throw new ss.NotImplementedException();
        },
      }
    ));
    var D = (global.tab.ApiMessagingOptions = ss.mkType(
      a,
      'tab.ApiMessagingOptions',
      function (e, bj) {
        this.$1 = null;
        this.$0 = null;
        l.verifyValue(e, 'router');
        this.$1 = e;
        this.$0 = bj;
      },
      {
        get_handler: function () {
          return this.$0;
        },
        get_router: function () {
          return this.$1;
        },
        sendCommand: function (e) {
          return function (bj, bk) {
            this.$1.sendCommand(e).call(this.$1, this.$0, bj, bk);
          };
        },
        dispose: function () {
          this.$1.unregisterHandler(this.$0);
        },
      }
    ));
    var E = (global.tab.ApiNullOption = ss.mkEnum(
      a,
      'tab.ApiNullOption',
      {
        nullValues: 'nullValues',
        nonNullValues: 'nonNullValues',
        allValues: 'allValues',
      },
      true
    ));
    var F = (global.tab.ApiParameterAllowableValuesType = ss.mkEnum(
      a,
      'tab.ApiParameterAllowableValuesType',
      { all: 'all', list: 'list', range: 'range' },
      true
    ));
    var G = (global.tab.ApiParameterDataType = ss.mkEnum(
      a,
      'tab.ApiParameterDataType',
      {
        float: 'float',
        integer: 'integer',
        string: 'string',
        boolean: 'boolean',
        date: 'date',
        datetime: 'datetime',
      },
      true
    ));
    var H = (global.tab.ApiPeriodType = ss.mkEnum(
      a,
      'tab.ApiPeriodType',
      {
        year: 'year',
        quarter: 'quarter',
        month: 'month',
        week: 'week',
        day: 'day',
        hour: 'hour',
        minute: 'minute',
        second: 'second',
      },
      true
    ));
    var I = (global.tab.ApiSelectionUpdateType = ss.mkEnum(
      a,
      'tab.ApiSelectionUpdateType',
      { replace: 'replace', add: 'add', remove: 'remove' },
      true
    ));
    var J = (global.tab.ApiSheetSizeBehavior = ss.mkEnum(
      a,
      'tab.ApiSheetSizeBehavior',
      {
        automatic: 'automatic',
        exactly: 'exactly',
        range: 'range',
        atleast: 'atleast',
        atmost: 'atmost',
      },
      true
    ));
    var K = (global.tab.ApiSheetType = ss.mkEnum(
      a,
      'tab.ApiSheetType',
      { worksheet: 'worksheet', dashboard: 'dashboard', story: 'story' },
      true
    ));
    var L = (global.tab.ApiTableauEventName = ss.mkEnum(
      a,
      'tab.ApiTableauEventName',
      {
        custommarkcontextmenu: 'custommarkcontextmenu',
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
        urlaction: 'urlaction',
        vizresize: 'vizresize',
      },
      true
    ));
    var M = (global.tab.ApiToolbarButtonName = ss.mkEnum(
      a,
      'tab.ApiToolbarButtonName',
      { redo: 'redo', undo: 'undo' },
      true
    ));
    var N = (global.tab.ApiToolbarPosition = ss.mkEnum(
      a,
      'tab.ApiToolbarPosition',
      { top: 'top', bottom: 'bottom' },
      true
    ));
    var O = (global.tab.CommandReturnHandler$1 = ss.mkType(
      a,
      'tab.CommandReturnHandler$1',
      function (e) {
        var bj = ss.registerGenericClassInstance(
          O,
          [e],
          function (bk, bl, bm, bn) {
            this.$0 = null;
            this.$3 = 0;
            this.$2 = null;
            this.$1 = null;
            this.$0 = bk;
            this.$2 = bm;
            this.$3 = bl;
            this.$1 = bn;
          },
          {
            get_commandName: function () {
              return this.$0;
            },
            get_successCallback: function () {
              return this.$2;
            },
            get_successCallbackTiming: function () {
              return this.$3;
            },
            get_errorCallback: function () {
              return this.$1;
            },
          }
        );
        return bj;
      }
    ));
    ss.initGenericClass(O, 1);
    var P = (global.tab.CrossDomainMessager = ss.mkType(
      a,
      'tab.CrossDomainMessager',
      function (e) {
        this.$8 = 0;
        this.$6 = {};
        this.$4 = {};
        this.$5 = {};
        this.$7 = null;
        this.$7 = e;
        if (p.hasWindowAddEventListener()) {
          window.addEventListener('message', ss.mkdel(this, this.$1), false);
        } else if (p.hasDocumentAttachEvent()) {
          var bj = ss.mkdel(this, this.$1);
          document.attachEvent('onmessage', bj);
          window.attachEvent('onmessage', bj);
        } else {
          window.onmessage = ss.mkdel(this, this.$1);
        }
        this.$8 = 0;
      },
      {
        registerHandler: function (e) {
          var bj = 'host' + this.$8;
          if (
            ss.isValue(e.get_hostId()) ||
            ss.isValue(this.$6[e.get_hostId()])
          ) {
            throw o.createInternalError(
              "Host '" + e.get_hostId() + "' is already registered."
            );
          }
          this.$8++;
          e.set_hostId(bj);
          this.$6[bj] = e;
          e.add_stateReadyForQuery(ss.mkdel(this, this.$3));
        },
        unregisterHandler: function (e) {
          if (
            ss.isValue(e.get_hostId()) ||
            ss.isValue(this.$6[e.get_hostId()])
          ) {
            delete this.$6[e.get_hostId()];
            e.remove_stateReadyForQuery(ss.mkdel(this, this.$3));
          }
        },
        sendCommand: function (e) {
          return function (bj, bk, bl) {
            var bm = bj.get_iframe();
            var bn = bj.get_hostId();
            if (
              !p.hasWindowPostMessage() ||
              ss.isNullOrUndefined(bm) ||
              ss.isNullOrUndefined(bm.contentWindow)
            ) {
              return;
            }
            var bo = b.generateNextCommandId();
            var bp = this.$4[bn];
            if (ss.isNullOrUndefined(bp)) {
              bp = {};
              this.$4[bn] = bp;
            }
            bp[bo] = bl;
            var bq = bl.get_commandName();
            var br = null;
            if (ss.isValue(bk)) {
              br = JSON.stringify(bk);
            }
            var bs = new b(bq, bo, bn, br);
            var bt = bs.serialize();
            if (p.isPostMessageSynchronous()) {
              window.setTimeout(function () {
                bm.contentWindow.postMessage(bt, '*');
              }, 0);
            } else {
              bm.contentWindow.postMessage(bt, '*');
            }
          };
        },
        $3: function (e) {
          var bj = this.$5[e.get_hostId()];
          if (p.isNullOrEmpty(bj)) {
            return;
          }
          while (bj.length > 0) {
            var bk = bj.pop();
            if (ss.isValue(bk)) {
              bk();
            }
          }
        },
        $1: function (e) {
          var bj = e;
          if (ss.isNullOrUndefined(bj.data)) {
            return;
          }
          var bk = b.parse(bj.data.toString());
          var bl = bk.get_hostId();
          var bm = this.$6[bl];
          if (
            ss.isNullOrUndefined(bm) ||
            !ss.referenceEquals(bm.get_hostId(), bk.get_hostId())
          ) {
            bm = this.$0(bj);
          }
          if (bk.get_isApiCommandName()) {
            if (bk.get_commandId() === 'xdomainSourceId') {
              bm.handleEventNotification(bk.get_name(), bk.get_parameters());
              if (bk.get_name() === 'api.FirstVizSizeKnownEvent') {
                var bn = new X('tableau.bootstrap', []);
                bj.source.postMessage(bn.serialize(), '*');
              }
            } else {
              this.$2(bk);
            }
          } else if (!ss.isNullOrUndefined(this.$7)) {
            var bo = X.parse(bj.data.toString());
            this.$7(bo, bm);
          }
        },
        $2: function (e) {
          var bj = this.$4[e.get_hostId()];
          var bk = ss.isValue(bj) ? bj[e.get_commandId()] : null;
          if (ss.isNullOrUndefined(bk)) {
            return;
          }
          delete bj[e.get_commandId()];
          if (e.get_name() !== bk.get_commandName()) {
            return;
          }
          var bl = new f(e.get_parameters());
          var bm = bl.get_data();
          if (bl.get_result() === 'api.success') {
            switch (bk.get_successCallbackTiming()) {
              case 0: {
                if (ss.isValue(bk.get_successCallback())) {
                  bk.get_successCallback()(bm);
                }
                break;
              }
              case 1: {
                var bn = function () {
                  if (ss.isValue(bk.get_successCallback())) {
                    bk.get_successCallback()(bm);
                  }
                };
                var bo = this.$5[e.get_hostId()];
                if (ss.isNullOrUndefined(bo)) {
                  bo = [];
                  this.$5[e.get_hostId()] = bo;
                }
                bo.push(bn);
                break;
              }
              default: {
                throw o.createInternalError(
                  'Unknown timing value: ' + bk.get_successCallbackTiming()
                );
              }
            }
          } else if (ss.isValue(bk.get_errorCallback())) {
            var bp = bl.get_result() === 'api.remotefailed';
            var bq = ss.isValue(bm) ? bm.toString() : '';
            bk.get_errorCallback()(bp, bq);
          }
        },
        $0: function (e) {
          var bj = new ss.ObjectEnumerator(this.$6);
          try {
            while (bj.moveNext()) {
              var bk = bj.current();
              if (
                this.$6.hasOwnProperty(bk.key) &&
                ss.referenceEquals(
                  bk.value.get_iframe().contentWindow,
                  e.source
                )
              ) {
                return bk.value;
              }
            }
          } finally {
            bj.dispose();
          }
          return new q();
        },
      }
    ));
    var Q = (global.tab.DataType = ss.mkEnum(
      a,
      'tab.DataType',
      {
        float: 'float',
        integer: 'integer',
        string: 'string',
        boolean: 'boolean',
        date: 'date',
        datetime: 'datetime',
      },
      true
    ));
    var R = (global.tab.DataValue = ss.mkType(a, 'tab.DataValue', null, null, {
      $ctor: function (e, bj, bk) {
        var bl = new Object();
        bl.value = null;
        bl.formattedValue = null;
        bl.value = e;
        if (p.isNullOrEmpty(bk)) {
          bl.formattedValue = bj;
        } else {
          bl.formattedValue = bk;
        }
        return bl;
      },
      isInstanceOfType: function () {
        return true;
      },
    }));
    var S = (global.tab.FilterCommandsBuilder = ss.mkType(
      a,
      'tab.FilterCommandsBuilder',
      function () {},
      {
        buildApplyFiltersCommandParams: function (e, bj, bk, bl) {
          if (p.isNullOrEmpty(e)) {
            throw o.createNullOrEmptyParameter('fieldName');
          }
          bk = Z.normalizeEnum(A).call(null, bk, 'updateType');
          var bm = [];
          if (k.isArray(bj)) {
            for (var bn = 0; bn < bj.length; bn++) {
              bm.push(bj[bn].toString());
            }
          } else if (ss.isValue(bj)) {
            bm.push(bj.toString());
          }
          var bo = {};
          bo['api.fieldCaption'] = e;
          bo['api.filterUpdateType'] = bk;
          bo['api.exclude'] = ss.isValue(bl) && bl.isExcludeMode ? true : false;
          if (bk !== 'all') {
            bo['api.filterCategoricalValues'] = bm;
          }
          return bo;
        },
        buildRangeFilterCommandParams: function (e, bj) {
          if (p.isNullOrEmpty(e)) {
            throw o.createNullOrEmptyParameter('fieldName');
          }
          if (ss.isNullOrUndefined(bj)) {
            throw o.createNullOrEmptyParameter('filterOptions');
          }
          var bk = {};
          bk['api.fieldCaption'] = e;
          if (ss.isValue(bj.min)) {
            if (p.isDate(bj.min)) {
              var bl = bj.min;
              if (p.isDateValid(bl)) {
                bk['api.filterRangeMin'] = p.serializeDateForServer(bl);
              } else {
                throw o.createInvalidDateParameter('filterOptions.min');
              }
            } else {
              bk['api.filterRangeMin'] = bj.min;
            }
          }
          if (ss.isValue(bj.max)) {
            if (p.isDate(bj.max)) {
              var bm = bj.max;
              if (p.isDateValid(bm)) {
                bk['api.filterRangeMax'] = p.serializeDateForServer(bm);
              } else {
                throw o.createInvalidDateParameter('filterOptions.max');
              }
            } else {
              bk['api.filterRangeMax'] = bj.max;
            }
          }
          if (ss.isValue(bj.nullOption)) {
            bk['api.filterRangeNullOption'] = bj.nullOption;
          }
          return bk;
        },
        buildRelativeDateFilterCommandParams: function (e, bj) {
          if (p.isNullOrEmpty(e)) {
            throw o.createInvalidParameter('fieldName');
          } else if (ss.isNullOrUndefined(bj)) {
            throw o.createInvalidParameter('filterOptions');
          }
          var bk = {};
          bk['api.fieldCaption'] = e;
          if (ss.isValue(bj)) {
            bk['api.filterPeriodType'] = bj.periodType;
            bk['api.filterDateRangeType'] = bj.rangeType;
            if (bj.rangeType === 'lastn' || bj.rangeType === 'nextn') {
              if (ss.isNullOrUndefined(bj.rangeN)) {
                throw o.create(
                  'missingRangeNForRelativeDateFilters',
                  'Missing rangeN field for a relative date filter of LASTN or NEXTN.'
                );
              }
              bk['api.filterDateRange'] = bj.rangeN;
            }
            if (ss.isValue(bj.anchorDate)) {
              bk['api.filterDateArchorValue'] = p.serializeDateForServer(
                bj.anchorDate
              );
            }
          }
          return bk;
        },
        buildHierarchicalFilterCommandParams: function (e, bj, bk, bl) {
          if (p.isNullOrEmpty(e)) {
            throw o.createNullOrEmptyParameter('fieldName');
          }
          bk = Z.normalizeEnum(A).call(null, bk, 'updateType');
          var bm = null;
          var bn = null;
          if (k.isArray(bj)) {
            bm = [];
            var bo = bj;
            for (var bp = 0; bp < bo.length; bp++) {
              bm.push(bo[bp].toString());
            }
          } else if (p.isString(bj)) {
            bm = [];
            bm.push(bj.toString());
          } else if (ss.isValue(bj) && ss.isValue(bj['levels'])) {
            var bq = bj['levels'];
            bn = [];
            if (k.isArray(bq)) {
              var br = bq;
              for (var bs = 0; bs < br.length; bs++) {
                bn.push(br[bs].toString());
              }
            } else {
              bn.push(bq.toString());
            }
          } else if (ss.isValue(bj)) {
            throw o.createInvalidParameter('values');
          }
          var bt = {};
          bt['api.fieldCaption'] = e;
          bt['api.filterUpdateType'] = bk;
          bt['api.exclude'] = ss.isValue(bl) && bl.isExcludeMode ? true : false;
          if (ss.isValue(bm)) {
            bt['api.filterHierarchicalValues'] = JSON.stringify(bm);
          }
          if (ss.isValue(bn)) {
            bt['api.filterHierarchicalLevels'] = JSON.stringify(bn);
          }
          return bt;
        },
        buildClearFilterCommandsParam: function (e) {
          if (p.isNullOrEmpty(e)) {
            throw o.createNullOrEmptyParameter('fieldName');
          }
          var bj = {};
          bj['api.fieldCaption'] = e;
          return bj;
        },
        filterCommandError: function (e) {
          var bj = e;
          if (ss.isValue(bj) && ss.isValue(bj.errorCode)) {
            var bk = ss.isValue(bj.additionalInformation)
              ? bj.additionalInformation.toString()
              : '';
            switch (bj.errorCode) {
              case 'invalidFilterFieldName': {
                return o.create('invalidFilterFieldName', bk);
              }
              case 'invalidFilterFieldValue': {
                return o.create('invalidFilterFieldValue', bk);
              }
              case 'invalidAggregationFieldName': {
                return o.createInvalidAggregationFieldName(bk);
              }
              default: {
                return o.createServerError(bk);
              }
            }
          }
          return null;
        },
        normalizeRangeFilterOption: function (e) {
          if (ss.isNullOrUndefined(e)) {
            throw o.createNullOrEmptyParameter('filterOptions');
          }
          if (
            ss.isNullOrUndefined(e.min) &&
            ss.isNullOrUndefined(e.max) &&
            ss.isNullOrUndefined(e.nullOption)
          ) {
            throw o.create(
              'invalidParameter',
              'At least one of filterOptions.min or filterOptions.max or filterOptions.nullOption must be specified.'
            );
          }
          var bj = new Object();
          if (ss.isValue(e.min)) {
            bj.min = e.min;
          }
          if (ss.isValue(e.max)) {
            bj.max = e.max;
          }
          if (ss.isValue(e.nullOption)) {
            bj.nullOption = Z.normalizeEnum(E).call(
              null,
              e.nullOption,
              'filterOptions.nullOption'
            );
          }
          return bj;
        },
        normalizeRelativeDateFilterOptions: function (e) {
          if (ss.isNullOrUndefined(e)) {
            throw o.createNullOrEmptyParameter('filterOptions');
          }
          var bj = new Object();
          bj.rangeType = Z.normalizeEnum(t).call(
            null,
            e.rangeType,
            'filterOptions.rangeType'
          );
          bj.periodType = Z.normalizeEnum(H).call(
            null,
            e.periodType,
            'filterOptions.periodType'
          );
          if (bj.rangeType === 'lastn' || bj.rangeType === 'nextn') {
            if (ss.isNullOrUndefined(e.rangeN)) {
              throw o.create(
                'missingRangeNForRelativeDateFilters',
                'Missing rangeN field for a relative date filter of LASTN or NEXTN.'
              );
            }
            bj.rangeN = p.toInt(e.rangeN);
          }
          if (ss.isValue(e.anchorDate)) {
            if (!p.isDate(e.anchorDate) || !p.isDateValid(e.anchorDate)) {
              throw o.createInvalidDateParameter('filterOptions.anchorDate');
            }
            bj.anchorDate = e.anchorDate;
          }
          return bj;
        },
        createFilterCommandReturnHandler: function (e, bj, bk) {
          return new (ss.makeGenericType(O, [Object]))(
            e,
            0,
            ss.mkdel(this, function (bl) {
              var bm = this.filterCommandError(bl);
              if (ss.isNullOrUndefined(bm)) {
                bk.resolve(bj);
              } else {
                bk.reject(bm);
              }
            }),
            function (bl, bm) {
              if (bl) {
                bk.reject(o.createInvalidFilterFieldNameOrValue(bj));
              } else {
                var bn = o.create('filterCannotBePerformed', bm);
                bk.reject(bn);
              }
            }
          );
        },
      }
    ));
    var T = (global.tab.GetDataCommandsBuilder = ss.mkType(
      a,
      'tab.GetDataCommandsBuilder',
      function () {},
      {
        getSummaryDataCommandParams: function (e) {
          var bj = {};
          e = e || new Object();
          bj['api.ignoreAliases'] = ss.coalesce(e.ignoreAliases, false);
          bj['api.ignoreSelection'] = ss.coalesce(e.ignoreSelection, false);
          bj['api.maxRows'] = ss.coalesce(e.maxRows, 0);
          return bj;
        },
        getUnderlyingDataCommandParams: function (e) {
          var bj = {};
          e = e || new Object();
          bj['api.ignoreAliases'] = ss.coalesce(e.ignoreAliases, false);
          bj['api.ignoreSelection'] = ss.coalesce(e.ignoreSelection, false);
          bj['api.includeAllColumns'] = ss.coalesce(e.includeAllColumns, false);
          bj['api.maxRows'] = ss.coalesce(e.maxRows, 0);
          return bj;
        },
        getUnderlyingTablesCommandParams: function () {
          return {};
        },
        getUnderlyingTableDataCommandParams: function (e, bj) {
          var bk = {};
          bj = bj || new Object();
          bk['api.ignoreAliases'] = ss.coalesce(bj.ignoreAliases, false);
          bk['api.ignoreSelection'] = ss.coalesce(bj.ignoreSelection, false);
          bk['api.includeAllColumns'] = ss.coalesce(
            bj.includeAllColumns,
            false
          );
          bk['api.maxRows'] = ss.coalesce(bj.maxRows, 0);
          bk['api.tableId'] = ss.coalesce(e, '');
          return bk;
        },
        getSummaryDataResponseHandler: function (e) {
          return new (ss.makeGenericType(O, [Object]))(
            'api.GetSummaryTableCommand',
            0,
            ss.mkdel(this, function (bj) {
              var bk = bj;
              var bl = this.processGetDataPresModel(bk);
              e.resolve(bl);
            }),
            function (bj, bk) {
              e.reject(o.createServerError(bk));
            }
          );
        },
        getUnderlyingDataResponseHandler: function (e) {
          return new (ss.makeGenericType(O, [Object]))(
            'api.GetUnderlyingTableCommand',
            0,
            ss.mkdel(this, function (bj) {
              var bk = bj;
              var bl = this.processGetDataPresModel(bk);
              e.resolve(bl);
            }),
            function (bj, bk) {
              e.reject(o.createServerError(bk));
            }
          );
        },
        processGetDataPresModel: function (e) {
          var bj = this.$3(e.dataTable);
          var bk = this.$2(e.headers);
          var bl = new i(bj, e.isSummary, bj.length, bk);
          return new bf(bl);
        },
        $3: function (e) {
          var bj = [];
          for (var bk = 0; bk < e.length; bk++) {
            var bl = e[bk];
            var bm = [];
            for (var bn = 0; bn < bl.length; bn++) {
              var bo = bl[bn];
              bm.push(p.getDataValue(bo));
            }
            bj.push(bm);
          }
          return bj;
        },
        $2: function (e) {
          var bj = [];
          for (var bk = 0; bk < e.length; bk++) {
            var bl = e[bk];
            var bm = new h(
              bl.fieldName,
              v.convertDataType(bl.dataType),
              bl.isReferenced,
              bl.index
            );
            bj.push(new be(bm));
          }
          return bj;
        },
        $0: function (e, bj) {
          var bk = bj;
          if (!e) {
            var bl = new ss.StringBuilder(bj);
            bl.append('\nPossible reasons:');
            bl.append(
              '\nCalling newer version of API against an older version of Tableau Server'
            );
            bk = bl.toString();
          }
          console.error(bk);
          return bk;
        },
        getUnderlyingTablesResponseHandler: function (e) {
          return new (ss.makeGenericType(O, [Object]))(
            'api.GetUnderlyingTablesCommand',
            0,
            ss.mkdel(this, function (bj) {
              var bk = bj;
              var bl = this.$1(bk);
              e.resolve(bl._toApiCollection());
            }),
            ss.mkdel(this, function (bj, bk) {
              e.reject(o.createServerError(this.$0(bj, bk)));
            })
          );
        },
        $1: function (e) {
          var bj = new tab._Collection();
          for (var bk = 0; bk < e.logicalTables.length; bk++) {
            var bl = e.logicalTables[bk];
            bj._add(bl.tableId, new bg(bl.tableId, bl.caption));
          }
          return bj;
        },
        getUnderlyingTableDataResponseHandler: function (e) {
          return new (ss.makeGenericType(O, [Object]))(
            'api.GetUnderlyingTableDataCommand',
            0,
            ss.mkdel(this, function (bj) {
              var bk = bj;
              var bl = this.processGetDataPresModel(bk);
              e.resolve(bl);
            }),
            ss.mkdel(this, function (bj, bk) {
              e.reject(o.createServerError(this.$0(bj, bk)));
            })
          );
        },
      }
    ));
    var U = (global.tab.HostedApiMessageHandler = ss.mkType(
      a,
      'tab.HostedApiMessageHandler',
      function () {
        this.$2$1 = null;
        C.call(this);
      },
      {
        add_stateReadyForQuery: function (e) {
          this.$2$1 = ss.delegateCombine(this.$2$1, e);
        },
        remove_stateReadyForQuery: function (e) {
          this.$2$1 = ss.delegateRemove(this.$2$1, e);
        },
        get_hostId: function () {
          return null;
        },
        set_hostId: function (e) {},
        get_iframe: function () {
          return null;
        },
      }
    ));
    var V = (global.tab.HostedApiMessageRouter = ss.mkType(
      a,
      'tab.HostedApiMessageRouter',
      function () {
        this.$0 = null;
        this.$0 = new P(null);
      },
      {
        registerHandler: function (e) {
          this.$0.registerHandler(e);
        },
        unregisterHandler: function (e) {
          this.$0.unregisterHandler(e);
        },
        sendCommand: function (e) {
          return function (bj, bk, bl) {
            this.$0.sendCommand(e).call(this.$0, bj, bk, bl);
          };
        },
      }
    ));
    var W = (global.tab.MarkImpl = ss.mkType(
      a,
      'tab.MarkImpl',
      function (e) {
        this.$2 = null;
        this.$3 = new tab._Collection();
        this.$4 = 0;
        if (k.isArray(e)) {
          var bj = e;
          for (var bk = 0; bk < bj.length; bk++) {
            var bl = bj[bk];
            if (!ss.isValue(bl.fieldName)) {
              throw o.createInvalidParameter('pair.fieldName');
            }
            if (!ss.isValue(bl.value)) {
              throw o.createInvalidParameter('pair.value');
            }
            var bm = new bi(bl.fieldName, bl.value);
            this.$3._add(bm.fieldName, bm);
          }
        } else {
          this.$4 = e;
        }
      },
      {
        get_pairs: function () {
          return this.$3;
        },
        get_tupleId: function () {
          return this.$4;
        },
        $1: function () {
          if (ss.isNullOrUndefined(this.$2)) {
            this.$2 = this.$3._toApiCollection();
          }
          return this.$2;
        },
        $0: function (e) {
          this.$3._add(e.fieldName, e);
        },
      },
      {
        processActiveMarks: function (e) {
          var bj = new tab._Collection();
          if (ss.isNullOrUndefined(e) || p.isNullOrEmpty(e.marks)) {
            return bj;
          }
          for (var bk = 0; bk < e.marks.length; bk++) {
            var bl = e.marks[bk];
            var bm = bl.tupleId;
            var bn = new bh(bm);
            bj._add(bm.toString(), bn);
            for (var bo = 0; bo < bl.pairs.length; bo++) {
              var bp = bl.pairs[bo];
              var bq = p.convertRawValue(bp.value, bp.valueDataType);
              var br = new bi(bp.fieldName, bq);
              br.formattedValue = bp.formattedValue;
              if (!bn.impl.get_pairs()._has(br.fieldName)) {
                bn.impl.$0(br);
              }
            }
          }
          return bj;
        },
      }
    ));
    var X = (global.tab.NonApiCommand = ss.mkType(
      a,
      'tab.NonApiCommand',
      function (e, bj) {
        this.$0 = null;
        this.$1$1 = null;
        this.set_name(e);
        this.$0 = bj;
      },
      {
        get_name: function () {
          return this.$1$1;
        },
        set_name: function (e) {
          this.$1$1 = e;
        },
        get_parameters: function () {
          return this.$0;
        },
        serialize: function () {
          var e = [];
          e.push(this.get_name().toString());
          e = e.concat.apply(e, this.$0);
          return e.join(',');
        },
      },
      {
        parse: function (e) {
          var bj = e.split(String.fromCharCode(44));
          var bk = bj[0];
          var bl = bj.slice(1);
          return new X(bk, bl);
        },
      }
    ));
    var Y = (global.tab.Point = ss.mkType(a, 'tab.Point', null, null, {
      $ctor: function (e, bj) {
        var bk = new Object();
        bk.x = 0;
        bk.y = 0;
        bk.x = e;
        bk.y = bj;
        return bk;
      },
      isInstanceOfType: function () {
        return true;
      },
    }));
    var Z = (global.tab.PublicEnums = ss.mkType(
      a,
      'tab.PublicEnums',
      null,
      null,
      {
        tryNormalizeEnum: function (e) {
          return function (bj, bk) {
            if (ss.isValue(bj)) {
              var bl = bj.toString().toUpperCase();
              var bm = ss.Enum.getValues(e);
              for (var bn = 0; bn < bm.length; bn++) {
                var bo = bm[bn];
                var bp = bo.toUpperCase();
                if (ss.referenceEquals(bl, bp)) {
                  bk.$ = bo;
                  return true;
                }
              }
            }
            bk.$ = ss.getDefaultValue(e);
            return false;
          };
        },
        normalizeEnum: function (e) {
          return function (bj, bk) {
            var bl = {};
            if (!Z.tryNormalizeEnum(e).call(null, bj, bl)) {
              throw o.createInvalidParameter(bk);
            }
            return bl.$;
          };
        },
        isValidEnum: function (e) {
          return function (bj) {
            var bk = {};
            var bl = Z.tryNormalizeEnum(e).call(null, bj, bk);
            return bl;
          };
        },
      }
    ));
    var ba = (global.tab.SharedUtils = ss.mkType(
      a,
      'tab.SharedUtils',
      function () {},
      {
        addVisualIdForWorksheet: function (e, bj, bk) {
          e['api.worksheetName'] = bj;
          if (ss.isValue(bk)) {
            e['api.dashboardName'] = bk;
          }
        },
      }
    ));
    var bb = (global.tab.SheetSize = ss.mkType(a, 'tab.SheetSize', null, null, {
      $ctor: function (e, bj, bk) {
        var bl = new Object();
        bl.behavior = null;
        bl.minSize = null;
        bl.maxSize = null;
        bl.behavior = ss.coalesce(e, 'automatic');
        if (ss.isValue(bj)) {
          bl.minSize = bj;
        } else {
          delete bl['minSize'];
        }
        if (ss.isValue(bk)) {
          bl.maxSize = bk;
        } else {
          delete bl['maxSize'];
        }
        return bl;
      },
      isInstanceOfType: function () {
        return true;
      },
    }));
    var bc = (global.tab.SheetSizeFactory = ss.mkType(
      a,
      'tab.SheetSizeFactory',
      null,
      null,
      {
        createAutomatic: function () {
          var e = bb.$ctor('automatic', null, null);
          return e;
        },
        fromSizeConstraints: function (e) {
          var bj = e.minHeight;
          var bk = e.minWidth;
          var bl = e.maxHeight;
          var bm = e.maxWidth;
          var bn = 'automatic';
          var bo = null;
          var bp = null;
          if (bj === 0 && bk === 0) {
            if (bl === 0 && bm === 0) {
            } else {
              bn = 'atmost';
              bp = bd.$ctor(bm, bl);
            }
          } else if (bl === 0 && bm === 0) {
            bn = 'atleast';
            bo = bd.$ctor(bk, bj);
          } else if (bl === bj && bm === bk && bk > 0) {
            bn = 'exactly';
            bo = bd.$ctor(bk, bj);
            bp = bd.$ctor(bk, bj);
          } else {
            bn = 'range';
            if (bk === 0 && bm === 0) {
              bm = 2147483647;
            }
            bo = bd.$ctor(bk, bj);
            bp = bd.$ctor(bm, bl);
          }
          return bb.$ctor(bn, bo, bp);
        },
      }
    ));
    var bd = (global.tab.Size = ss.mkType(a, 'tab.Size', null, null, {
      $ctor: function (e, bj) {
        var bk = new Object();
        bk.width = 0;
        bk.height = 0;
        bk.width = e;
        bk.height = bj;
        return bk;
      },
      isInstanceOfType: function () {
        return true;
      },
    }));
    var be = (global.tableauSoftware.Column = ss.mkType(
      a,
      'tableauSoftware.Column',
      function (e) {
        this.$0 = null;
        this.$0 = e;
      },
      {
        getFieldName: function () {
          return this.$0.get_fieldName();
        },
        getDataType: function () {
          return this.$0.get_dataType();
        },
        getIsReferenced: function () {
          return this.$0.get_isReferenced();
        },
        getIndex: function () {
          return this.$0.get_index();
        },
      }
    ));
    var bf = (global.tableauSoftware.DataTable = ss.mkType(
      a,
      'tableauSoftware.DataTable',
      function (e) {
        this.$0 = null;
        this.$0 = e;
      },
      {
        getName: function () {
          return this.$0.get_name();
        },
        getData: function () {
          return this.$0.get_rows();
        },
        getColumns: function () {
          return this.$0.get_columns();
        },
        getTotalRowCount: function () {
          return this.$0.get_totalRowCount();
        },
        getIsSummaryData: function () {
          return this.$0.get_isSummaryData();
        },
      }
    ));
    var bg = (global.tableauSoftware.LogicalTable = ss.mkType(
      a,
      'tableauSoftware.LogicalTable',
      function (e, bj) {
        this.$1 = null;
        this.$0 = null;
        this.$1 = e;
        this.$0 = bj;
      },
      {
        getTableId: function () {
          return this.$1;
        },
        getCaption: function () {
          return this.$0;
        },
      }
    ));
    var bh = (global.tableauSoftware.Mark = ss.mkType(
      a,
      'tableauSoftware.Mark',
      function (e) {
        this.impl = null;
        this.impl = new W(e);
      },
      {
        getPairs: function () {
          return this.impl.$1();
        },
      }
    ));
    var bi = (global.tableauSoftware.Pair = ss.mkType(
      a,
      'tableauSoftware.Pair',
      function (e, bj) {
        this.fieldName = null;
        this.value = null;
        this.formattedValue = null;
        this.fieldName = e;
        this.value = bj;
        this.formattedValue = ss.isValue(bj) ? bj.toString() : '';
      }
    ));
    ss.initClass(b);
    ss.initClass(c);
    ss.initClass(d);
    ss.initClass(f);
    ss.initClass(g);
    ss.initClass(h);
    ss.initClass(i);
    ss.initClass(j);
    ss.initClass(k);
    ss.initClass(l);
    ss.initClass(m);
    ss.initClass(n);
    ss.initClass(o);
    ss.initClass(p);
    ss.initClass(q);
    ss.initClass(r);
    ss.initClass(v);
    ss.initClass(C);
    ss.initClass(D);
    ss.initClass(P);
    ss.initClass(R, Object);
    ss.initClass(S);
    ss.initClass(T);
    ss.initClass(U, C);
    ss.initClass(V);
    ss.initClass(W);
    ss.initClass(X);
    ss.initClass(Y, Object);
    ss.initClass(Z);
    ss.initClass(ba);
    ss.initClass(bb, Object);
    ss.initClass(bc);
    ss.initClass(bd, Object);
    ss.initClass(be);
    ss.initClass(bf);
    ss.initClass(bg);
    ss.initClass(bh);
    ss.initClass(bi);
    (function () {
      b.crossDomainEventNotificationId = 'xdomainSourceId';
      b.$0 = 0;
    })();
    (function () {
      var e = window['_ApiObjectRegistryGlobalState'];
      var bj = e;
      if (ss.isNullOrUndefined(bj)) {
        bj = new Object();
      }
      window['_ApiObjectRegistryGlobalState'] = bj;
      window._ApiObjectRegistryGlobalState.creationRegistry =
        window._ApiObjectRegistryGlobalState.creationRegistry || {};
      window._ApiObjectRegistryGlobalState.singletonInstanceRegistry =
        window._ApiObjectRegistryGlobalState.singletonInstanceRegistry || {};
    })();
    (function () {
      l.$0 = 128;
    })();
    (function () {
      k.$1 = 'array';
      k.$2 = 'boolean';
      k.$3 = 'date';
      k.$4 = 'function';
      k.$5 = 'number';
      k.$6 = 'object';
      k.$7 = 'regexp';
      k.$8 = 'string';
      k.$9 = ss.mkdict([
        '[object Boolean]',
        'boolean',
        '[object Number]',
        'number',
        '[object String]',
        'string',
        '[object Function]',
        'function',
        '[object Array]',
        'array',
        '[object Date]',
        'date',
        '[object RegExp]',
        'regexp',
        '[object Object]',
        'object',
      ]);
      k.$f = String.prototype['trim'];
      k.$e = Object.prototype['toString'];
      k.$g = new RegExp('^[\\s\\xA0]+');
      k.$h = new RegExp('[\\s\\xA0]+$');
      k.$b = new RegExp('^[\\],:{}\\s]*$');
      k.$c = new RegExp('\\\\(?:["\\\\\\/bfnrt]|u[0-9a-fA-F]{4})', 'g');
      k.$d = new RegExp(
        '"[^"\\\\\\n\\r]*"|true|false|null|-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?',
        'g'
      );
      k.$a = new RegExp('(?:^|:|,)(?:\\s*\\[)+', 'g');
    })();
    (function () {
      var e = global.tableauSoftware;
      e.DeviceType = {
        DEFAULT: 'default',
        DESKTOP: 'desktop',
        TABLET: 'tablet',
        PHONE: 'phone',
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
        WEB_PAGE: 'webPage',
        ADDIN: 'addIn',
      };
      e.DataType = {
        FLOAT: 'float',
        INTEGER: 'integer',
        STRING: 'string',
        BOOLEAN: 'boolean',
        DATE: 'date',
        DATETIME: 'datetime',
      };
      e.DateRangeType = {
        LAST: 'last',
        LASTN: 'lastn',
        NEXT: 'next',
        NEXTN: 'nextn',
        CURR: 'curr',
        TODATE: 'todate',
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
        MISSING_RANGEN_FOR_RELATIVE_DATE_FILTERS:
          'missingRangeNForRelativeDateFilters',
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
        MAX_VIZ_RESIZE_ATTEMPTS: 'maxVizResizeAttempts',
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
        USER: 'USER',
        COLLECT: 'COLLECT',
      };
      e.FieldRoleType = {
        DIMENSION: 'dimension',
        MEASURE: 'measure',
        UNKNOWN: 'unknown',
      };
      e.FilterUpdateType = {
        ALL: 'all',
        REPLACE: 'replace',
        ADD: 'add',
        REMOVE: 'remove',
      };
      e.FilterType = {
        CATEGORICAL: 'categorical',
        QUANTITATIVE: 'quantitative',
        HIERARCHICAL: 'hierarchical',
        RELATIVEDATE: 'relativedate',
      };
      e.NullOption = {
        NULL_VALUES: 'nullValues',
        NON_NULL_VALUES: 'nonNullValues',
        ALL_VALUES: 'allValues',
      };
      e.ParameterAllowableValuesType = {
        ALL: 'all',
        LIST: 'list',
        RANGE: 'range',
      };
      e.ParameterDataType = {
        FLOAT: 'float',
        INTEGER: 'integer',
        STRING: 'string',
        BOOLEAN: 'boolean',
        DATE: 'date',
        DATETIME: 'datetime',
      };
      e.PeriodType = {
        YEAR: 'year',
        QUARTER: 'quarter',
        MONTH: 'month',
        WEEK: 'week',
        DAY: 'day',
        HOUR: 'hour',
        MINUTE: 'minute',
        SECOND: 'second',
      };
      e.SelectionUpdateType = {
        REPLACE: 'replace',
        ADD: 'add',
        REMOVE: 'remove',
      };
      e.SheetSizeBehavior = {
        AUTOMATIC: 'automatic',
        EXACTLY: 'exactly',
        RANGE: 'range',
        ATLEAST: 'atleast',
        ATMOST: 'atmost',
      };
      e.SheetType = {
        WORKSHEET: 'worksheet',
        DASHBOARD: 'dashboard',
        STORY: 'story',
      };
      e.TableauEventName = {
        CUSTOM_MARK_CONTEXT_MENU: 'custommarkcontextmenu',
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
        URL_ACTION: 'urlaction',
        VIZ_RESIZE: 'vizresize',
      };
      e.ToolbarPosition = { TOP: 'top', BOTTOM: 'bottom' };
      e.ToolbarButtonName = { REDO: 'redo', UNDO: 'undo' };
      e.MenuType = { UBERTIP: 'ubertip' };
    })();
  })();
  /*! API */
  (function () {
    'use strict';
    var a = {};
    global.tab = global.tab || {};
    global.tableauSoftware = global.tableauSoftware || {};
    ss.initAssembly(a, 'Tableau.JavaScript.Vql.Api');
    var b = (global.tab._ApiBootstrap = ss.mkType(
      a,
      'tab._ApiBootstrap',
      null,
      null,
      {
        initialize: function () {
          tab._ApiObjectRegistry.registerApiMessageRouter(function () {
            return new E();
          });
        },
      }
    ));
    var c = (global.tab._CustomViewImpl = ss.mkType(
      a,
      'tab._CustomViewImpl',
      function (e, bo, bp) {
        this.$a = null;
        this.$h = null;
        this.$j = null;
        this.$e = null;
        this.$f = null;
        this.$g = null;
        this.$i = null;
        this.$c = false;
        this.$b = false;
        this.$d = false;
        this.$j = e;
        this.$f = bo;
        this.$e = bp;
        this.$c = false;
        this.$b = false;
        this.$d = false;
      },
      {
        $3: function () {
          if (ss.isNullOrUndefined(this.$a)) {
            this.$a = new T(this);
          }
          return this.$a;
        },
        $9: function () {
          return this.$j.get_workbook();
        },
        $8: function () {
          return this.$i;
        },
        $5: function () {
          return this.$f;
        },
        $6: function (e) {
          if (this.$d) {
            throw tab._TableauException.create(
              'staleDataReference',
              'Stale data'
            );
          }
          this.$f = e;
        },
        $7: function () {
          return this.$g;
        },
        $1: function () {
          return this.$c;
        },
        $2: function (e) {
          if (this.$d) {
            throw tab._TableauException.create(
              'staleDataReference',
              'Stale data'
            );
          }
          this.$c = e;
        },
        $4: function () {
          return this.$b;
        },
        saveAsync: function () {
          if (this.$d || ss.isNullOrUndefined(this.$h)) {
            throw tab._TableauException.create(
              'staleDataReference',
              'Stale data'
            );
          }
          this.$h.isPublic = this.$c;
          this.$h.name = this.$f;
          var e = new tab._Deferred();
          var bo = {};
          bo['api.customViewParam'] = this.$h;
          var bp = c.$0(
            'api.UpdateCustomViewCommand',
            e,
            ss.mkdel(this, function (bq) {
              c._processCustomViewUpdate(this.$j, this.$e, bq, true);
              e.resolve(this.$3());
            })
          );
          this.$e.sendCommand(Object).call(this.$e, bo, bp);
          return e.get_promise();
        },
        $0: function () {
          var e = new tab._Deferred();
          var bo = {};
          bo['api.customViewParam'] = this.$h;
          var bp = c.$0(
            'api.RemoveCustomViewCommand',
            e,
            ss.mkdel(this, function (bq) {
              this.$d = true;
              c._processCustomViews(this.$j, this.$e, bq);
              e.resolve(this.$3());
            })
          );
          this.$e.sendCommand(Object).call(this.$e, bo, bp);
          return e.get_promise();
        },
        _showAsync: function () {
          if (this.$d || ss.isNullOrUndefined(this.$h)) {
            throw tab._TableauException.create(
              'staleDataReference',
              'Stale data'
            );
          }
          return c._showCustomViewAsync(this.$j, this.$e, this.$h);
        },
      },
      {
        _getAsync: function (e) {
          var bo = new tab._Deferred();
          bo.resolve(e.get__customViewImpl().$3());
          return bo.get_promise();
        },
        _createNew: function (e, bo, bp, bq) {
          var br = new c(e, bp.name, bo);
          br.$c = bp.isPublic;
          br.$i = bp.url;
          br.$g = bp.owner.friendlyName;
          br.$b = ss.isValue(bq) && ss.unbox(bq) === bp.id;
          br.$h = bp;
          return br;
        },
        _saveNewAsync: function (e, bo, bp) {
          var bq = new tab._Deferred();
          var br = {};
          br['api.customViewName'] = bp;
          var bs = c.$0('api.SaveNewCustomViewCommand', bq, function (bt) {
            c._processCustomViewUpdate(e, bo, bt, true);
            var bu = null;
            if (ss.isValue(e.$k())) {
              bu = e.$k().get_item(0);
            }
            bq.resolve(bu);
          });
          bo.sendCommand(Object).call(bo, br, bs);
          return bq.get_promise();
        },
        _showCustomViewAsync: function (e, bo, bp) {
          var bq = new tab._Deferred();
          var br = {};
          if (ss.isValue(bp)) {
            br['api.customViewParam'] = bp;
          }
          var bs = c.$0('api.ShowCustomViewCommand', bq, function (bt) {
            var bu = e.get_activeCustomView();
            bq.resolve(bu);
          });
          bo.sendCommand(Object).call(bo, br, bs);
          return bq.get_promise();
        },
        _makeCurrentCustomViewDefaultAsync: function (e, bo) {
          var bp = new tab._Deferred();
          var bq = {};
          var br = c.$0(
            'api.MakeCurrentCustomViewDefaultCommand',
            bp,
            function (bs) {
              var bt = e.get_activeCustomView();
              bp.resolve(bt);
            }
          );
          bo.sendCommand(Object).call(bo, bq, br);
          return bp.get_promise();
        },
        _getCustomViewsAsync: function (e, bo) {
          var bp = new tab._Deferred();
          var bq = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object,
          ]))(
            'api.FetchCustomViewsCommand',
            0,
            function (br) {
              c._processCustomViews(e, bo, br);
              bp.resolve(e.$d()._toApiCollection());
            },
            function (br, bs) {
              bp.reject(tab._TableauException.create('serverError', bs));
            }
          );
          bo.sendCommand(Object).call(bo, null, bq);
          return bp.get_promise();
        },
        _processCustomViews: function (e, bo, bp) {
          c._processCustomViewUpdate(e, bo, bp, false);
        },
        _processCustomViewUpdate: function (e, bo, bp, bq) {
          e.$c(null);
          e.$j(e.$d());
          e.$e(new tab._Collection());
          if (bq) {
            e.$l(new tab._Collection());
            if (ss.isValue(bp.newView)) {
              c.$1(e, bo, bp, bp.newView, bq);
            }
          }
          if (ss.isValue(bp.customViews)) {
            for (var br = 0; br < bp.customViews.length; br++) {
              var bs = bp.customViews[br];
              c.$1(e, bo, bp, bs, bq);
            }
          }
        },
        buildCustomViewKeyForDuplicate: function (e, bo) {
          return e + '/' + bo;
        },
        $1: function (e, bo, bp, bq, br) {
          var bs = null;
          var bt = null;
          if (ss.isValue(bp.currentView)) {
            bs = bp.currentView.name;
            bt = bp.currentView.owner.friendlyName;
          }
          var bu = bp.defaultCustomViewId;
          var bv = c._createNew(e, bo, bq, bu);
          var bw = bv.$5();
          if (e.$d()._has(bw)) {
            bw = c.buildCustomViewKeyForDuplicate(bv.$5(), bq.owner.username);
          }
          e.$d()._add(bw, bv.$3());
          if (e.$i()._has(bw)) {
            e.$i()._remove(bw);
          } else if (br && !e.$k()._has(bw)) {
            e.$k()._add(bw, bv.$3());
          }
          if (
            ss.isValue(bs) &&
            ss.referenceEquals(bv.$5(), bs) &&
            ss.referenceEquals(bv.$7(), bt)
          ) {
            e.$c(bv.$3());
          }
        },
        $0: function (e, bo, bp) {
          var bq = function (br, bs) {
            bo.reject(tab._TableauException.create('serverError', bs));
          };
          return new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))(
            e,
            0,
            bp,
            bq
          );
        },
      }
    ));
    var d = (global.tab._DashboardImpl = ss.mkType(
      a,
      'tab._DashboardImpl',
      function (e, bo, bp) {
        this.$g = null;
        this.$k = new tab._Collection();
        this.$h = new tab._Collection();
        this.$i = new tab.FilterCommandsBuilder();
        this.$j = new tab.SharedUtils();
        g.call(this, e, bo, bp);
      },
      {
        get_sheet: function () {
          return this.get_dashboard();
        },
        get_dashboard: function () {
          if (ss.isNullOrUndefined(this.$g)) {
            this.$g = new U(this);
          }
          return this.$g;
        },
        get_worksheets: function () {
          return this.$k;
        },
        get_objects: function () {
          return this.$h;
        },
        $c: function (e, bo) {
          this.$h = new tab._Collection();
          this.$k = new tab._Collection();
          for (var bp = 0; bp < e.length; bp++) {
            var bq = e[bp];
            var br = null;
            if (e[bp].objectType === 'worksheet') {
              var bs = bq.name;
              if (ss.isNullOrUndefined(bs)) {
                continue;
              }
              var bt = this.$k.get__length();
              var bu = tab.SheetSizeFactory.createAutomatic();
              var bv = false;
              var bw = bo(bs);
              var bx = ss.isNullOrUndefined(bw);
              var by = bx ? '' : bw.getUrl();
              var bz = h.$ctor(
                bs,
                'worksheet',
                bt,
                bu,
                this.get_workbook(),
                by,
                bv,
                bx,
                bq.zoneId
              );
              var bA = new p(
                bz,
                this.get_workbookImpl(),
                this.get_messagingOptions(),
                this
              );
              br = bA.get_worksheet();
              this.$k._add(bs, bA.get_worksheet());
            }
            var bB = new V(bq, this.get_dashboard(), br);
            this.$h._add(bp.toString(), bB);
          }
        },
        $e: function () {
          var e = new tab._Deferred();
          var bo = {};
          var bp = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object,
          ]))(
            'api.GetDashboardFiltersListCommand',
            0,
            ss.mkdel(this, function (bq) {
              var br = Object.keys(bq.filters);
              var bs = new Array();
              var bt = ss.getEnumerator(br);
              try {
                while (bt.moveNext()) {
                  var bu = bt.current();
                  for (
                    var bv = 0;
                    bv < this.get_worksheets().get__length();
                    bv++
                  ) {
                    if (
                      ss.referenceEquals(
                        this.get_worksheets().get_item(bv)._impl.get_name(),
                        bu
                      )
                    ) {
                      var bw = new Object();
                      bw.filters = Array.prototype.slice.call(bq.filters[bu]);
                      var bx = bw;
                      var by = Y.processFiltersList(
                        this.get_worksheets().get_item(bv)._impl,
                        bx
                      );
                      bs = bs.concat(by._toApiCollection());
                    }
                  }
                }
              } finally {
                bt.dispose();
              }
              e.resolve(bs);
            }),
            function (bq, br) {
              e.reject(tab._TableauException.createServerError(br));
            }
          );
          this.sendCommand(Object).call(this, bo, bp);
          return e.get_promise();
        },
        $d: function (e, bo, bp, bq) {
          this.$f();
          var br = this.$i.buildApplyFiltersCommandParams(e, bo, bp, bq);
          br['api.dashboardName'] = this.get_name();
          var bs = new tab._Deferred();
          var bt = this.$i.createFilterCommandReturnHandler(
            'api.ApplyDashboardCategoricalFilterCommand',
            e,
            bs
          );
          this.sendCommand(Object).call(this, br, bt);
          return bs.get_promise();
        },
        $f: function () {
          var e = this.get_isActive();
          var bo =
            ss.isValue(this.get_parentStoryPointImpl()) &&
            this.get_parentStoryPointImpl()
              .get_parentStoryImpl()
              .get_isActive();
          if (!e && !bo) {
            throw tab._TableauException.createNotActiveSheet();
          }
        },
      }
    ));
    var f = (global.tab._DataSourceImpl = ss.mkType(
      a,
      'tab._DataSourceImpl',
      function (e, bo) {
        this.$3 = null;
        this.$1 = new tab._Collection();
        this.$2 = false;
        this.$0 = null;
        tab._Param.verifyString(e, 'name');
        this.$3 = e;
        this.$2 = bo;
      },
      {
        get_dataSource: function () {
          if (ss.isNullOrUndefined(this.$0)) {
            this.$0 = new W(this);
          }
          return this.$0;
        },
        get_name: function () {
          return this.$3;
        },
        get_fields: function () {
          return this.$1;
        },
        get_isPrimary: function () {
          return this.$2;
        },
        addField: function (e) {
          this.$1._add(e.getName(), e);
        },
      },
      {
        processDataSource: function (e) {
          var bo = new f(e.name, e.isPrimary);
          var bp = ss.coalesce(e.fields, []);
          for (var bq = 0; bq < bp.length; bq++) {
            var br = bp[bq];
            var bs = tab.ApiEnumConverter.convertFieldRole(br.role);
            var bt = tab.ApiEnumConverter.convertFieldAggregation(
              br.aggregation
            );
            var bu = new X(bo.get_dataSource(), br.name, bs, bt);
            bo.addField(bu);
          }
          return bo;
        },
        processDataSourcesForWorksheet: function (e) {
          var bo = new tab._Collection();
          var bp = null;
          for (var bq = 0; bq < e.dataSources.length; bq++) {
            var br = e.dataSources[bq];
            var bs = f.processDataSource(br);
            if (br.isPrimary) {
              bp = bs;
            } else {
              bo._add(br.name, bs.get_dataSource());
            }
          }
          if (ss.isValue(bp)) {
            bo._addToFirst(bp.get_name(), bp.get_dataSource());
          }
          return bo;
        },
      }
    ));
    var g = (global.tab._SheetImpl = ss.mkType(
      a,
      'tab._SheetImpl',
      function (e, bo, bp) {
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
        tab._Param.verifyValue(e, 'sheetInfoImpl');
        tab._Param.verifyValue(bo, 'workbookImpl');
        tab._Param.verifyValue(bp, 'messagingOptions');
        this.$5 = e.name;
        this.$1 = e.index;
        this.$2 = e.isActive;
        this.$3 = e.isHidden;
        this.$7 = e.sheetType;
        this.$8 = e.size;
        this.$9 = e.url;
        this.$a = bo;
        this.$4 = bp;
        this.$b = e.zoneId;
      },
      {
        get_sheet: null,
        get_name: function () {
          return this.$5;
        },
        get_index: function () {
          return this.$1;
        },
        get_workbookImpl: function () {
          return this.$a;
        },
        get_workbook: function () {
          return this.$a.get_workbook();
        },
        get_url: function () {
          if (this.$3) {
            throw tab._TableauException.createNoUrlForHiddenWorksheet();
          }
          return this.$9;
        },
        get_size: function () {
          return this.$8;
        },
        get_isHidden: function () {
          return this.$3;
        },
        get_isActive: function () {
          return this.$2;
        },
        set_isActive: function (e) {
          this.$2 = e;
        },
        get_isDashboard: function () {
          return this.$7 === 'dashboard';
        },
        get_isStory: function () {
          return this.$7 === 'story';
        },
        get_sheetType: function () {
          return this.$7;
        },
        get_parentStoryPoint: function () {
          if (ss.isValue(this.$6)) {
            return this.$6.get_storyPoint();
          }
          return null;
        },
        get_parentStoryPointImpl: function () {
          return this.$6;
        },
        set_parentStoryPointImpl: function (e) {
          if (this.$7 === 'story') {
            throw tab._TableauException.createInternalError(
              'A story cannot be a child of another story.'
            );
          }
          this.$6 = e;
        },
        get_zoneId: function () {
          return this.$b;
        },
        get_messagingOptions: function () {
          return this.$4;
        },
        changeSizeAsync: function (e) {
          e = g.$1(e);
          if (this.$7 === 'worksheet' && e.behavior !== 'automatic') {
            throw tab._TableauException.createInvalidSizeBehaviorOnWorksheet();
          }
          var bo = new tab._Deferred();
          if (this.$8.behavior === e.behavior && e.behavior === 'automatic') {
            bo.resolve(e);
            return bo.get_promise();
          }
          var bp = this.$0(e);
          var bq = {};
          bq['api.setSheetSizeName'] = this.$5;
          bq['api.minWidth'] = bp['api.minWidth'];
          bq['api.minHeight'] = bp['api.minHeight'];
          bq['api.maxWidth'] = bp['api.maxWidth'];
          bq['api.maxHeight'] = bp['api.maxHeight'];
          var br = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object,
          ]))(
            'api.SetSheetSizeCommand',
            0,
            ss.mkdel(this, function (bs) {
              this.get_workbookImpl()._update(
                ss.mkdel(this, function () {
                  var bt = this.get_workbookImpl()
                    .get_publishedSheets()
                    ._get(this.get_name())
                    .getSize();
                  bo.resolve(bt);
                })
              );
            }),
            function (bs, bt) {
              bo.reject(tab._TableauException.createServerError(bt));
            }
          );
          this.sendCommand(Object).call(this, bq, br);
          return bo.get_promise();
        },
        sendCommand: function (e) {
          return function (bo, bp) {
            this.$4.sendCommand(e).call(this.$4, bo, bp);
          };
        },
        $0: function (e) {
          var bo = null;
          if (
            ss.isNullOrUndefined(e) ||
            ss.isNullOrUndefined(e.behavior) ||
            (e.behavior !== 'automatic' &&
              ss.isNullOrUndefined(e.minSize) &&
              ss.isNullOrUndefined(e.maxSize))
          ) {
            throw tab._TableauException.createInvalidSheetSizeParam();
          }
          var bp = 0;
          var bq = 0;
          var br = 0;
          var bs = 0;
          var bt = {};
          bt['api.minWidth'] = 0;
          bt['api.minHeight'] = 0;
          bt['api.maxWidth'] = 0;
          bt['api.maxHeight'] = 0;
          if (e.behavior === 'automatic') {
            bo = tab.SheetSize.$ctor('automatic', undefined, undefined);
          } else if (e.behavior === 'atmost') {
            if (
              ss.isNullOrUndefined(e.maxSize) ||
              ss.isNullOrUndefined(e.maxSize.width) ||
              ss.isNullOrUndefined(e.maxSize.height)
            ) {
              throw tab._TableauException.createMissingMaxSize();
            }
            if (e.maxSize.width < 0 || e.maxSize.height < 0) {
              throw tab._TableauException.createInvalidSizeValue();
            }
            bt['api.maxWidth'] = e.maxSize.width;
            bt['api.maxHeight'] = e.maxSize.height;
            bo = tab.SheetSize.$ctor('atmost', undefined, e.maxSize);
          } else if (e.behavior === 'atleast') {
            if (
              ss.isNullOrUndefined(e.minSize) ||
              ss.isNullOrUndefined(e.minSize.width) ||
              ss.isNullOrUndefined(e.minSize.height)
            ) {
              throw tab._TableauException.createMissingMinSize();
            }
            if (e.minSize.width < 0 || e.minSize.height < 0) {
              throw tab._TableauException.createInvalidSizeValue();
            }
            bt['api.minWidth'] = e.minSize.width;
            bt['api.minHeight'] = e.minSize.height;
            bo = tab.SheetSize.$ctor('atleast', e.minSize, undefined);
          } else if (e.behavior === 'range') {
            if (
              ss.isNullOrUndefined(e.minSize) ||
              ss.isNullOrUndefined(e.maxSize) ||
              ss.isNullOrUndefined(e.minSize.width) ||
              ss.isNullOrUndefined(e.maxSize.width) ||
              ss.isNullOrUndefined(e.minSize.height) ||
              ss.isNullOrUndefined(e.maxSize.height)
            ) {
              throw tab._TableauException.createMissingMinMaxSize();
            }
            if (
              e.minSize.width < 0 ||
              e.minSize.height < 0 ||
              e.maxSize.width < 0 ||
              e.maxSize.height < 0 ||
              e.minSize.width > e.maxSize.width ||
              e.minSize.height > e.maxSize.height
            ) {
              throw tab._TableauException.createInvalidRangeSize();
            }
            bt['api.minWidth'] = e.minSize.width;
            bt['api.minHeight'] = e.minSize.height;
            bt['api.maxWidth'] = e.maxSize.width;
            bt['api.maxHeight'] = e.maxSize.height;
            bo = tab.SheetSize.$ctor('range', e.minSize, e.maxSize);
          } else if (e.behavior === 'exactly') {
            if (
              ss.isValue(e.minSize) &&
              ss.isValue(e.maxSize) &&
              ss.isValue(e.minSize.width) &&
              ss.isValue(e.maxSize.width) &&
              ss.isValue(e.minSize.height) &&
              ss.isValue(e.maxSize.height)
            ) {
              bp = e.minSize.width;
              bq = e.minSize.height;
              br = e.maxSize.width;
              bs = e.maxSize.height;
              if (bp !== br || bq !== bs) {
                throw tab._TableauException.createSizeConflictForExactly();
              }
            } else if (
              ss.isValue(e.minSize) &&
              ss.isValue(e.minSize.width) &&
              ss.isValue(e.minSize.height)
            ) {
              bp = e.minSize.width;
              bq = e.minSize.height;
              br = bp;
              bs = bq;
            } else if (
              ss.isValue(e.maxSize) &&
              ss.isValue(e.maxSize.width) &&
              ss.isValue(e.maxSize.height)
            ) {
              br = e.maxSize.width;
              bs = e.maxSize.height;
              bp = br;
              bq = bs;
            }
            bt['api.minWidth'] = bp;
            bt['api.minHeight'] = bq;
            bt['api.maxWidth'] = br;
            bt['api.maxHeight'] = bs;
            bo = tab.SheetSize.$ctor(
              'exactly',
              tab.Size.$ctor(bp, bq),
              tab.Size.$ctor(br, bs)
            );
          }
          this.$8 = bo;
          return bt;
        },
      },
      {
        $0: function (e) {
          if (ss.isValue(e)) {
            return tab._Utility.toInt(e);
          }
          return e;
        },
        $1: function (e) {
          var bo = tab.PublicEnums.normalizeEnum(tab.ApiSheetSizeBehavior).call(
            null,
            e.behavior,
            'size.behavior'
          );
          var bp = e.minSize;
          if (ss.isValue(bp)) {
            bp = tab.Size.$ctor(g.$0(e.minSize.width), g.$0(e.minSize.height));
          }
          var bq = e.maxSize;
          if (ss.isValue(bq)) {
            bq = tab.Size.$ctor(g.$0(e.maxSize.width), g.$0(e.maxSize.height));
          }
          return tab.SheetSize.$ctor(bo, bp, bq);
        },
      }
    ));
    var h = (global.tab._SheetInfoImpl = ss.mkType(
      a,
      'tab._SheetInfoImpl',
      null,
      null,
      {
        $ctor: function (e, bo, bp, bq, br, bs, bt, bu, bv) {
          var bw = new Object();
          bw.name = null;
          bw.index = 0;
          bw.workbook = null;
          bw.url = null;
          bw.isHidden = false;
          bw.sheetType = null;
          bw.zoneId = 0;
          bw.size = null;
          bw.isActive = false;
          bw.name = e;
          bw.sheetType = bo;
          bw.index = bp;
          bw.size = bq;
          bw.workbook = br;
          bw.url = bs;
          bw.isActive = bt;
          bw.isHidden = bu;
          bw.zoneId = bv;
          return bw;
        },
        isInstanceOfType: function () {
          return true;
        },
      }
    ));
    var i = (global.tab._StoryImpl = ss.mkType(
      a,
      'tab._StoryImpl',
      function (e, bo, bp, bq, br) {
        this.$g = null;
        this.$h = null;
        this.$i = null;
        this.$j = null;
        this.$2$1 = null;
        g.call(this, e, bo, bp);
        tab._Param.verifyValue(bq, 'storyPm');
        tab._Param.verifyValue(br, 'findSheetFunc');
        this.$h = br;
        this.update(bq);
      },
      {
        add_activeStoryPointChange: function (e) {
          this.$2$1 = ss.delegateCombine(this.$2$1, e);
        },
        remove_activeStoryPointChange: function (e) {
          this.$2$1 = ss.delegateRemove(this.$2$1, e);
        },
        get_activeStoryPointImpl: function () {
          return this.$g;
        },
        get_sheet: function () {
          return this.get_story();
        },
        get_story: function () {
          if (ss.isNullOrUndefined(this.$i)) {
            this.$i = new bf(this);
          }
          return this.$i;
        },
        get_storyPointsInfo: function () {
          return this.$j;
        },
        update: function (e) {
          var bo = null;
          var bp = null;
          this.$j = this.$j || new Array(e.storyPoints.length);
          for (var bq = 0; bq < e.storyPoints.length; bq++) {
            var br = e.storyPoints[bq];
            var bs = br.caption;
            var bt = bq === e.activeStoryPointIndex;
            var bu = k.$ctor(bs, bq, br.storyPointId, bt, br.isUpdated, this);
            if (ss.isNullOrUndefined(this.$j[bq])) {
              this.$j[bq] = new bh(bu);
            } else if (this.$j[bq]._impl.storyPointId === bu.storyPointId) {
              var bv = this.$j[bq]._impl;
              bv.caption = bu.caption;
              bv.index = bu.index;
              bv.isActive = bt;
              bv.isUpdated = bu.isUpdated;
            } else {
              this.$j[bq] = new bh(bu);
            }
            if (bt) {
              bo = br.containedSheetInfo;
              bp = bu;
            }
          }
          var bw = this.$j.length - e.storyPoints.length;
          this.$j.splice(e.storyPoints.length, bw);
          var bx =
            ss.isNullOrUndefined(this.$g) ||
            this.$g.get_storyPointId() !== bp.storyPointId;
          if (ss.isValue(this.$g) && bx) {
            this.$g.set_isActive(false);
          }
          var by = this.$g;
          if (bx) {
            var bz = j.createContainedSheet(
              bo,
              this.get_workbookImpl(),
              this.get_messagingOptions(),
              this.$h
            );
            this.$g = new j(bp, bz);
          } else {
            this.$g.set_isActive(bp.isActive);
            this.$g.set_isUpdated(bp.isUpdated);
          }
          if (bx && ss.isValue(by)) {
            this.$d(this.$j[by.get_index()], this.$g.get_storyPoint());
          }
        },
        activatePreviousStoryPointAsync: function () {
          return this.$c('api.ActivatePreviousStoryPoint');
        },
        activateNextStoryPointAsync: function () {
          return this.$c('api.ActivateNextStoryPoint');
        },
        activateStoryPointAsync: function (e) {
          var bo = new tab._Deferred();
          if (e < 0 || e >= this.$j.length) {
            throw tab._TableauException.createIndexOutOfRange(e);
          }
          var bp = {};
          bp['api.storyPointIndex'] = e;
          var bq = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object,
          ]))(
            'api.ActivateStoryPoint',
            0,
            ss.mkdel(this, function (br) {
              this.$e(br);
              bo.resolve(this.$g.get_storyPoint());
            }),
            function (br, bs) {
              bo.reject(tab._TableauException.createServerError(bs));
            }
          );
          this.sendCommand(Object).call(this, bp, bq);
          return bo.get_promise();
        },
        revertStoryPointAsync: function (e) {
          e = e || this.$g.get_index();
          if (e < 0 || e >= this.$j.length) {
            throw tab._TableauException.createIndexOutOfRange(e);
          }
          var bo = new tab._Deferred();
          var bp = {};
          bp['api.storyPointIndex'] = e;
          var bq = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object,
          ]))(
            'api.RevertStoryPoint',
            0,
            ss.mkdel(this, function (br) {
              this.$f(e, br);
              bo.resolve(this.$j[e]);
            }),
            function (br, bs) {
              bo.reject(tab._TableauException.createServerError(bs));
            }
          );
          this.sendCommand(Object).call(this, bp, bq);
          return bo.get_promise();
        },
        $c: function (e) {
          if (
            e !== 'api.ActivatePreviousStoryPoint' &&
            e !== 'api.ActivateNextStoryPoint'
          ) {
            throw tab._TableauException.createInternalError(
              "commandName '" + e + "' is invalid."
            );
          }
          var bo = new tab._Deferred();
          var bp = {};
          var bq = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object,
          ]))(
            e,
            0,
            ss.mkdel(this, function (br) {
              this.$e(br);
              bo.resolve(this.$g.get_storyPoint());
            }),
            function (br, bs) {
              bo.reject(tab._TableauException.createServerError(bs));
            }
          );
          this.sendCommand(Object).call(this, bp, bq);
          return bo.get_promise();
        },
        $f: function (e, bo) {
          var bp = this.$j[e]._impl;
          if (bp.storyPointId !== bo.storyPointId) {
            throw tab._TableauException.createInternalError(
              "We should not be updating a story point where the IDs don't match. Existing storyPointID=" +
                bp.storyPointId +
                ', newStoryPointID=' +
                bo.storyPointId
            );
          }
          bp.caption = bo.caption;
          bp.isUpdated = bo.isUpdated;
          if (bo.storyPointId === this.$g.get_storyPointId()) {
            this.$g.set_isUpdated(bo.isUpdated);
          }
        },
        $e: function (e) {
          var bo = this.$g;
          var bp = e.index;
          if (bo.get_index() === bp) {
            return;
          }
          var bq = this.$j[bo.get_index()];
          var br = this.$j[bp]._impl;
          var bs = j.createContainedSheet(
            e.containedSheetInfo,
            this.get_workbookImpl(),
            this.get_messagingOptions(),
            this.$h
          );
          br.isActive = true;
          this.$g = new j(br, bs);
          bo.set_isActive(false);
          bq._impl.isActive = false;
          this.$d(bq, this.$g.get_storyPoint());
        },
        $d: function (e, bo) {
          if (!ss.staticEquals(this.$2$1, null)) {
            this.$2$1(e, bo);
          }
        },
      }
    ));
    var j = (global.tab._StoryPointImpl = ss.mkType(
      a,
      'tab._StoryPointImpl',
      function (e, bo) {
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
        this.$2 = bo;
        if (ss.isValue(bo)) {
          this.$2.set_parentStoryPointImpl(this);
          if (bo.get_sheetType() === 'dashboard') {
            var bp = this.$2;
            for (var bq = 0; bq < bp.get_worksheets().get__length(); bq++) {
              var br = bp.get_worksheets().get_item(bq);
              br._impl.set_parentStoryPointImpl(this);
            }
          }
        }
      },
      {
        get_caption: function () {
          return this.$1;
        },
        get_containedSheetImpl: function () {
          return this.$2;
        },
        get_index: function () {
          return this.$3;
        },
        get_isActive: function () {
          return this.$4;
        },
        set_isActive: function (e) {
          this.$4 = e;
        },
        get_isUpdated: function () {
          return this.$5;
        },
        set_isUpdated: function (e) {
          this.$5 = e;
        },
        get_parentStoryImpl: function () {
          return this.$6;
        },
        get_storyPoint: function () {
          if (ss.isNullOrUndefined(this.$7)) {
            this.$7 = new bg(this);
          }
          return this.$7;
        },
        get_storyPointId: function () {
          return this.$8;
        },
        $0: function () {
          return k.$ctor(this.$1, this.$3, this.$8, this.$4, this.$5, this.$6);
        },
      },
      {
        createContainedSheet: function (e, bo, bp, bq) {
          if (ss.isNullOrUndefined(e) || ss.isNullOrUndefined(e.name)) {
            return null;
          }
          var br = tab.ApiEnumConverter.convertSheetType(e.sheetType);
          var bs = -1;
          var bt = tab.SheetSizeFactory.createAutomatic();
          var bu = false;
          var bv = bq(e.name);
          var bw = ss.isNullOrUndefined(bv);
          var bx = bw ? '' : bv.getUrl();
          var by = h.$ctor(
            e.name,
            br,
            bs,
            bt,
            bo.get_workbook(),
            bx,
            bu,
            bw,
            e.zoneId
          );
          if (e.sheetType === 'worksheet') {
            var bz = null;
            var bA = new p(by, bo, bp, bz);
            return bA;
          } else if (e.sheetType === 'dashboard') {
            var bB = new d(by, bo, bp);
            var bC = o.$0(e.dashboardZones);
            bB.$c(bC, bq);
            return bB;
          } else if (e.sheetType === 'story') {
            throw tab._TableauException.createInternalError(
              'Cannot have a story embedded within another story.'
            );
          } else {
            throw tab._TableauException.createInternalError(
              "Unknown sheet type '" + e.sheetType + "'"
            );
          }
        },
      }
    ));
    var k = (global.tab._StoryPointInfoImpl = ss.mkType(
      a,
      'tab._StoryPointInfoImpl',
      null,
      null,
      {
        $ctor: function (e, bo, bp, bq, br, bs) {
          var bt = new Object();
          bt.storyPointId = 0;
          bt.parentStoryImpl = null;
          bt.caption = null;
          bt.index = 0;
          bt.isActive = false;
          bt.isUpdated = false;
          bt.caption = e;
          bt.index = bo;
          bt.storyPointId = bp;
          bt.isActive = bq;
          bt.isUpdated = br;
          bt.parentStoryImpl = bs;
          return bt;
        },
        isInstanceOfType: function () {
          return true;
        },
      }
    ));
    var l = (global.tab._ToolbarStateImpl = ss.mkType(
      a,
      'tab._ToolbarStateImpl',
      function (e, bo) {
        this.$0 = null;
        this.$2 = null;
        this.$1 = null;
        this.$2 = e;
        this.$1 = bo;
      },
      {
        get_toolbarState: function () {
          if (ss.isNullOrUndefined(this.$0)) {
            this.$0 = new bi(this);
          }
          return this.$0;
        },
        get_viz: function () {
          return this.$2.$y();
        },
        isButtonEnabled: function (e) {
          switch (e) {
            case 'redo': {
              return this.$1.canRedo;
            }
            case 'undo': {
              return this.$1.canUndo;
            }
            default: {
              throw tab._TableauException.createInvalidToolbarButtonName(e);
            }
          }
        },
      }
    ));
    var m = ss.mkType(a, 'tab._VizManagerImpl', null, null, {
      $3: function () {
        return m.$6.concat();
      },
      $0: function (e) {
        m.$4(e);
        m.$6.push(e);
      },
      $2: function (e) {
        for (var bo = 0, bp = m.$6.length; bo < bp; bo++) {
          if (ss.referenceEquals(m.$6[bo], e)) {
            m.$6.splice(bo, 1);
            break;
          }
        }
      },
      $1: function () {
        for (var e = 0, bo = m.$6.length; e < bo; e++) {
          m.$6[e]._impl.$e();
        }
      },
      $4: function (e) {
        var bo = e.getParentElement();
        for (var bp = 0, bq = m.$6.length; bp < bq; bp++) {
          if (ss.referenceEquals(m.$6[bp].getParentElement(), bo)) {
            var br =
              "Another viz is already present in element '" +
              tab._Utility.elementToString(bo) +
              "'.";
            throw tab._TableauException.create('vizAlreadyInManager', br);
          }
        }
      },
    });
    var n = (global.tab._VizParameters = ss.mkType(
      a,
      'tab._VizParameters',
      function (e, bo, bp) {
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
        this.$3 = null;
        this.$2 = null;
        this.$1 = false;
        if (ss.isNullOrUndefined(e) || ss.isNullOrUndefined(bo)) {
          throw tab._TableauException.create(
            'noUrlOrParentElementNotFound',
            'URL is empty or Parent element not found'
          );
        }
        if (ss.isNullOrUndefined(bp)) {
          bp = new Object();
          bp.hideTabs = false;
          bp.hideToolbar = false;
          bp.onFirstInteractive = null;
        }
        if (ss.isValue(bp.height) || ss.isValue(bp.width)) {
          this.fixedSize = true;
          if (tab._Utility.isNumber(bp.height)) {
            bp.height = bp.height.toString() + 'px';
          }
          if (tab._Utility.isNumber(bp.width)) {
            bp.width = bp.width.toString() + 'px';
          }
          this.height = ss.isValue(bp.height)
            ? tab._Utility.roundVizSizeInPixels(bp.height.toString())
            : null;
          this.width = ss.isValue(bp.width)
            ? tab._Utility.roundVizSizeInPixels(bp.width.toString())
            : null;
        } else {
          this.fixedSize = false;
        }
        this.displayStaticImage = bp.displayStaticImage || false;
        this.staticImageUrl = bp.staticImageUrl || '';
        this.tabs = !(bp.hideTabs || false);
        this.toolbar = !(bp.hideToolbar || false);
        this.device = bp.device;
        this.parentElement = e;
        this.$2 = bp;
        this.toolBarPosition = bp.toolbarPosition;
        this.$1 = bp.disableUrlActionsPopups === true;
        var bq = bo.split('?');
        this.$3 = bq[0];
        if (bq.length === 2) {
          this.userSuppliedParameters = bq[1];
        } else {
          this.userSuppliedParameters = '';
        }
        var br = new RegExp('.*?[^/:]/', '').exec(this.$3);
        if (
          ss.isNullOrUndefined(br) ||
          (br[0].toLowerCase().indexOf('http://') === -1 &&
            br[0].toLowerCase().indexOf('https://') === -1)
        ) {
          throw tab._TableauException.create('invalidUrl', 'Invalid url');
        }
        this.host_url = br[0].toLowerCase();
        this.name = this.$3.replace(br[0], '');
        this.name = this.name.replace('views/', '');
      },
      {
        get_url: function () {
          return this.$0();
        },
        get_baseUrl: function () {
          return this.$3;
        },
        $0: function () {
          var e = [];
          e.push(this.get_baseUrl());
          e.push('?');
          if (this.userSuppliedParameters.length > 0) {
            e.push(this.userSuppliedParameters);
            e.push('&');
          }
          var bo =
            !this.fixedSize &&
            !(this.userSuppliedParameters.indexOf(':size=') !== -1) &&
            this.parentElement.clientWidth * this.parentElement.clientHeight >
              0;
          if (bo) {
            e.push(':size=');
            e.push(
              this.parentElement.clientWidth +
                ',' +
                this.parentElement.clientHeight
            );
            e.push('&');
          }
          if (!(this.userSuppliedParameters.indexOf(':embed=y') !== -1)) {
            e.push(':embed=y');
          }
          e.push('&:showVizHome=n');
          if (!this.fixedSize) {
            e.push('&:bootstrapWhenNotified=y');
          }
          if (!this.tabs) {
            e.push('&:tabs=n');
          }
          if (this.displayStaticImage) {
            e.push('&:display_static_image=y');
          }
          if (this.$1) {
            e.push('&:disableUrlActionsPopups=y');
          }
          if (!this.toolbar) {
            e.push('&:toolbar=n');
          } else if (!ss.isNullOrUndefined(this.toolBarPosition)) {
            e.push('&:toolbar=');
            e.push(this.toolBarPosition.toString());
          }
          if (ss.isValue(this.device)) {
            e.push('&:device=');
            e.push(this.device.toString());
          }
          var bp = this.$2;
          var bq = new ss.ObjectEnumerator(bp);
          try {
            while (bq.moveNext()) {
              var br = bq.current();
              if (
                br.key !== 'embed' &&
                br.key !== 'height' &&
                br.key !== 'width' &&
                br.key !== 'device' &&
                br.key !== 'autoSize' &&
                br.key !== 'hideTabs' &&
                br.key !== 'hideToolbar' &&
                br.key !== 'onFirstInteractive' &&
                br.key !== 'onFirstVizSizeKnown' &&
                br.key !== 'toolbarPosition' &&
                br.key !== 'instanceIdToClone' &&
                br.key !== 'navType' &&
                br.key !== 'display_static_image' &&
                br.key !== 'disableUrlActionsPopups'
              ) {
                e.push('&');
                e.push(encodeURIComponent(br.key));
                e.push('=');
                e.push(encodeURIComponent(br.value.toString()));
              }
            }
          } finally {
            bq.dispose();
          }
          e.push('&:apiID=' + this.hostId);
          e.push('#');
          if (ss.isValue(this.$2.instanceIdToClone)) {
            e.push(this.$2.instanceIdToClone + '&');
          }
          if (ss.isValue(this.$2.navType) && this.$2.navType.length > 0) {
            e.push('navType=' + this.$2.navType.toString() + '&');
            e.push('navSrc=' + 'Opt'.toString());
          } else {
            e.push(
              'navType=' + window.performance.navigation.type.toString() + '&'
            );
            e.push('navSrc=' + 'Parse'.toString());
          }
          return e.join('');
        },
      }
    ));
    var o = (global.tab._WorkbookImpl = ss.mkType(
      a,
      'tab._WorkbookImpl',
      function (e, bo, bp) {
        this.$E = null;
        this.$D = null;
        this.$y = null;
        this.$s = null;
        this.$r = null;
        this.$A = new tab._Collection();
        this.$v = false;
        this.$x = null;
        this.$t = null;
        this.$u = new tab._Collection();
        this.$C = new tab._Collection();
        this.$B = new tab._Collection();
        this.$z = null;
        this.$w = null;
        this.$D = e;
        this.$x = bo;
        this.$n(bp);
      },
      {
        get_workbook: function () {
          if (ss.isNullOrUndefined(this.$E)) {
            this.$E = new bm(this);
          }
          return this.$E;
        },
        get_viz: function () {
          return this.$D.$y();
        },
        get_publishedSheets: function () {
          return this.$A;
        },
        get_name: function () {
          return this.$y;
        },
        get_activeSheetImpl: function () {
          return this.$s;
        },
        get_activeCustomView: function () {
          return this.$t;
        },
        get_isDownloadAllowed: function () {
          return this.$v;
        },
        $3: function (e) {
          if (ss.isNullOrUndefined(this.$s)) {
            return null;
          }
          var bo = o.$1(e);
          if (ss.isNullOrUndefined(bo)) {
            return null;
          }
          if (ss.referenceEquals(bo, this.$s.get_name())) {
            return this.$s;
          }
          if (this.$s.get_isDashboard()) {
            var bp = this.$s;
            var bq = bp.get_worksheets()._get(bo);
            if (ss.isValue(bq)) {
              return bq._impl;
            }
          }
          return null;
        },
        _setActiveSheetAsync: function (e) {
          if (tab._Utility.isNumber(e)) {
            var bo = e;
            if (bo < this.$A.get__length() && bo >= 0) {
              return this.$1(this.$A.get_item(bo).$0);
            } else {
              throw tab._TableauException.createIndexOutOfRange(bo);
            }
          }
          var bp = o.$1(e);
          var bq = this.$A._get(bp);
          if (ss.isValue(bq)) {
            return this.$1(bq.$0);
          } else if (this.$s.get_isDashboard()) {
            var br = this.$s;
            var bs = br.get_worksheets()._get(bp);
            if (ss.isValue(bs)) {
              this.$r = null;
              var bt = '';
              if (bs.getIsHidden()) {
                this.$r = bs._impl;
              } else {
                bt = bs._impl.get_url();
              }
              return this.$0(bs._impl.get_name(), bt);
            }
          }
          throw tab._TableauException.create(
            'sheetNotInWorkbook',
            'Sheet is not found in Workbook'
          );
        },
        _revertAllAsync: function () {
          var e = new tab._Deferred();
          var bo = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object,
          ]))(
            'api.RevertAllCommand',
            1,
            function (bp) {
              e.resolve();
            },
            function (bp, bq) {
              e.reject(tab._TableauException.createServerError(bq));
            }
          );
          this.$q(Object).call(this, null, bo);
          return e.get_promise();
        },
        _update: function (e) {
          this.$n(e);
        },
        $1: function (e) {
          return this.$0(e.name, e.url);
        },
        $0: function (e, bo) {
          var bp = new tab._Deferred();
          if (
            ss.isValue(this.$s) &&
            ss.referenceEquals(e, this.$s.get_name())
          ) {
            bp.resolve(this.$s.get_sheet());
            return bp.get_promise();
          }
          var bq = {};
          bq['api.switchToSheetName'] = e;
          bq['api.switchToRepositoryUrl'] = bo;
          bq['api.oldRepositoryUrl'] = this.$s.get_url();
          var br = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object,
          ]))(
            'api.SwitchActiveSheetCommand',
            0,
            ss.mkdel(this, function (bs) {
              this.$D.$B = ss.mkdel(this, function () {
                this.$D.$B = null;
                bp.resolve(this.$s.get_sheet());
              });
            }),
            function (bs, bt) {
              bp.reject(tab._TableauException.createServerError(bt));
            }
          );
          this.$q(Object).call(this, bq, br);
          return bp.get_promise();
        },
        _updateActiveSheetAsync: function () {
          var e = new tab._Deferred();
          var bo = {};
          bo['api.switchToSheetName'] = this.$s.get_name();
          bo['api.switchToRepositoryUrl'] = this.$s.get_url();
          bo['api.oldRepositoryUrl'] = this.$s.get_url();
          var bp = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object,
          ]))(
            'api.UpdateActiveSheetCommand',
            0,
            ss.mkdel(this, function (bq) {
              e.resolve(this.$s.get_sheet());
            }),
            function (bq, br) {
              e.reject(tab._TableauException.createServerError(br));
            }
          );
          this.$q(Object).call(this, bo, bp);
          return e.get_promise();
        },
        $q: function (e) {
          return function (bo, bp) {
            this.$x.sendCommand(e).call(this.$x, bo, bp);
          };
        },
        $n: function (e) {
          var bo = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object,
          ]))(
            'api.GetClientInfoCommand',
            0,
            ss.mkdel(this, function (bp) {
              this.$p(bp);
              if (ss.isValue(e)) {
                e();
              }
            }),
            function (bp, bq) {
              throw tab._TableauException.createInternalError(bq);
            }
          );
          this.$q(Object).call(this, null, bo);
        },
        $p: function (e) {
          this.$y = e.workbookName;
          this.$v = e.isDownloadAllowed;
          this.$D.$f(!e.isAutoUpdate);
          this.$D.set_instanceId(e.instanceId);
          this.$m(e);
          this.$o(e);
        },
        $o: function (e) {
          var bo = e.currentSheetName;
          var bp = this.$A._get(bo);
          if (ss.isNullOrUndefined(bp) && ss.isNullOrUndefined(this.$r)) {
            throw tab._TableauException.createInternalError(
              'The active sheet was not specified in baseSheets'
            );
          }
          if (
            ss.isValue(this.$s) &&
            ss.referenceEquals(this.$s.get_name(), bo)
          ) {
            return;
          }
          if (ss.isValue(this.$s)) {
            this.$s.set_isActive(false);
            var bq = this.$A._get(this.$s.get_name());
            if (ss.isValue(bq)) {
              bq.$0.isActive = false;
            }
            if (this.$s.get_sheetType() === 'story') {
              var br = this.$s;
              br.remove_activeStoryPointChange(
                ss.mkdel(this.$D, this.$D.raiseStoryPointSwitch)
              );
            }
          }
          if (ss.isValue(this.$r)) {
            var bs = h.$ctor(
              this.$r.get_name(),
              'worksheet',
              -1,
              this.$r.get_size(),
              this.get_workbook(),
              '',
              true,
              true,
              4294967295
            );
            this.$r = null;
            this.$s = new p(bs, this, this.$x, null);
          } else {
            var bt = null;
            for (var bu = 0, bv = e.publishedSheets.length; bu < bv; bu++) {
              if (ss.referenceEquals(e.publishedSheets[bu].name, bo)) {
                bt = e.publishedSheets[bu];
                break;
              }
            }
            if (ss.isNullOrUndefined(bt)) {
              throw tab._TableauException.createInternalError(
                'No base sheet was found corresponding to the active sheet.'
              );
            }
            var bw = ss.mkdel(this, function (bA) {
              return this.$A._get(bA);
            });
            if (bt.sheetType === 'dashboard') {
              var bx = new d(bp.$0, this, this.$x);
              this.$s = bx;
              var by = o.$0(e.dashboardZones);
              bx.$c(by, bw);
            } else if (bt.sheetType === 'story') {
              var bz = new i(bp.$0, this, this.$x, e.story, bw);
              this.$s = bz;
              bz.add_activeStoryPointChange(
                ss.mkdel(this.$D, this.$D.raiseStoryPointSwitch)
              );
            } else {
              this.$s = new p(bp.$0, this, this.$x, null);
            }
            bp.$0.isActive = true;
          }
          this.$s.set_isActive(true);
        },
        $m: function (e) {
          var bo = e.publishedSheets;
          if (ss.isNullOrUndefined(bo)) {
            return;
          }
          for (var bp = 0; bp < bo.length; bp++) {
            var bq = bo[bp];
            var br = bq.name;
            var bs = this.$A._get(br);
            var bt = o.$2(bq);
            if (ss.isNullOrUndefined(bs)) {
              var bu = ss.referenceEquals(br, e.currentSheetName);
              var bv = tab.ApiEnumConverter.convertSheetType(bq.sheetType);
              var bw = h.$ctor(
                br,
                bv,
                bp,
                bt,
                this.get_workbook(),
                bq.repositoryUrl,
                bu,
                false,
                4294967295
              );
              bs = new be(bw);
              this.$A._add(br, bs);
            } else {
              bs.$0.size = bt;
            }
          }
        },
        $d: function () {
          return this.$u;
        },
        $e: function (e) {
          this.$u = e;
        },
        $k: function () {
          return this.$C;
        },
        $l: function (e) {
          this.$C = e;
        },
        $i: function () {
          return this.$B;
        },
        $j: function (e) {
          this.$B = e;
        },
        $b: function () {
          return this.$t;
        },
        $c: function (e) {
          this.$t = e;
        },
        $4: function () {
          return c._getCustomViewsAsync(this, this.$x);
        },
        $a: function (e) {
          if (ss.isNullOrUndefined(e) || tab._Utility.isNullOrEmpty(e)) {
            return c._showCustomViewAsync(this, this.$x, null);
          } else {
            var bo = this.$u._get(e);
            if (ss.isNullOrUndefined(bo)) {
              var bp = new tab._Deferred();
              bp.reject(tab._TableauException.createInvalidCustomViewName(e));
              return bp.get_promise();
            }
            return bo._impl._showAsync();
          }
        },
        $8: function (e) {
          if (tab._Utility.isNullOrEmpty(e)) {
            throw tab._TableauException.createNullOrEmptyParameter(
              'customViewName'
            );
          }
          var bo = this.$u._get(e);
          if (ss.isNullOrUndefined(bo)) {
            var bp = new tab._Deferred();
            bp.reject(tab._TableauException.createInvalidCustomViewName(e));
            return bp.get_promise();
          }
          return bo._impl.$0();
        },
        $7: function (e) {
          if (tab._Utility.isNullOrEmpty(e)) {
            throw tab._TableauException.createInvalidParameter(
              'customViewName'
            );
          }
          return c._saveNewAsync(this, this.$x, e);
        },
        $9: function () {
          return c._makeCurrentCustomViewDefaultAsync(this, this.$x);
        },
        $f: function () {
          return this.$w;
        },
        $g: function (e) {
          this.$w = e;
        },
        $h: function () {
          return this.$z;
        },
        $6: function (e) {
          var bo = new tab._Deferred();
          if (ss.isValue(this.$w)) {
            bo.resolve(this.$w.$8());
            return bo.get_promise();
          }
          var bp = {};
          var bq = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object,
          ]))(
            'api.FetchParametersCommand',
            0,
            ss.mkdel(this, function (br) {
              var bs = o.$3(e, br);
              this.$w = bs;
              bo.resolve(bs.$8());
            }),
            function (br, bs) {
              bo.reject(tab._TableauException.createServerError(bs));
            }
          );
          this.$q(Object).call(this, bp, bq);
          return bo.get_promise();
        },
        $5: function () {
          var e = new tab._Deferred();
          var bo = {};
          var bp = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object,
          ]))(
            'api.FetchParametersCommand',
            0,
            ss.mkdel(this, function (bq) {
              this.$z = o.$4(bq);
              e.resolve(this.$h()._toApiCollection());
            }),
            function (bq, br) {
              e.reject(tab._TableauException.createServerError(br));
            }
          );
          this.$q(Object).call(this, bo, bp);
          return e.get_promise();
        },
        $2: function (e, bo) {
          var bp = new tab._Deferred();
          var bq = null;
          if (ss.isValue(this.$z)) {
            if (ss.isNullOrUndefined(this.$z._get(e))) {
              bp.reject(tab._TableauException.createInvalidParameter(e));
              return bp.get_promise();
            }
            bq = this.$z._get(e)._impl;
            if (ss.isNullOrUndefined(bq)) {
              bp.reject(tab._TableauException.createInvalidParameter(e));
              return bp.get_promise();
            }
          }
          var br = {};
          br['api.setParameterName'] = ss.isValue(this.$z) ? bq.$7() : e;
          if (ss.isValue(bo) && tab._Utility.isDate(bo)) {
            var bs = bo;
            var bt = tab._Utility.serializeDateForServer(bs);
            br['api.setParameterValue'] = bt;
          } else {
            br['api.setParameterValue'] = ss.isValue(bo) ? bo.toString() : null;
          }
          this.$w = null;
          var bu = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object,
          ]))(
            'api.SetParameterValueCommand',
            0,
            ss.mkdel(this, function (bv) {
              if (ss.isNullOrUndefined(bv)) {
                bp.reject(
                  tab._TableauException.create('serverError', 'server error')
                );
                return;
              }
              if (!bv.isValidPresModel) {
                bp.reject(tab._TableauException.createInvalidParameter(e));
                return;
              }
              var bw = new w(bv);
              this.$w = bw;
              bp.resolve(bw.$8());
            }),
            function (bv, bw) {
              bp.reject(tab._TableauException.createInvalidParameter(e));
            }
          );
          this.$q(Object).call(this, br, bu);
          return bp.get_promise();
        },
      },
      {
        $0: function (e) {
          e = ss.coalesce(e, []);
          var bo = [];
          for (var bp = 0; bp < e.length; bp++) {
            var bq = e[bp];
            var br = tab.ApiEnumConverter.convertDashboardObjectType(
              bq.zoneType
            );
            var bs = tab.Size.$ctor(bq.width, bq.height);
            var bt = tab.Point.$ctor(bq.x, bq.y);
            var bu = bq.name;
            var bv = {
              name: bu,
              objectType: br,
              position: bt,
              size: bs,
              zoneId: bq.zoneId,
            };
            bo.push(bv);
          }
          return bo;
        },
        $1: function (e) {
          if (ss.isNullOrUndefined(e)) {
            return null;
          }
          if (tab._Utility.isString(e)) {
            return e;
          }
          var bo = ss.safeCast(e, bd);
          if (ss.isValue(bo)) {
            return bo.getName();
          }
          var bp = ss.safeCast(e, be);
          if (ss.isValue(bp)) {
            return bp.getName();
          }
          return null;
        },
        $2: function (e) {
          if (ss.isNullOrUndefined(e)) {
            return tab.SheetSizeFactory.createAutomatic();
          }
          return tab.SheetSizeFactory.fromSizeConstraints(e.sizeConstraints);
        },
        $4: function (e) {
          var bo = new tab._Collection();
          for (var bp = 0; bp < e.parameters.length; bp++) {
            var bq = e.parameters[bp];
            var br = new w(bq);
            bo._add(br.$7(), br.$8());
          }
          return bo;
        },
        $3: function (e, bo) {
          for (var bp = 0; bp < bo.parameters.length; bp++) {
            var bq = bo.parameters[bp];
            if (ss.referenceEquals(bq.name, e)) {
              return new w(bq);
            }
          }
          return null;
        },
      }
    ));
    var p = (global.tab._WorksheetImpl = ss.mkType(
      a,
      'tab._WorksheetImpl',
      function (e, bo, bp, bq) {
        this.$W = null;
        this.$T = null;
        this.$S = new tab.GetDataCommandsBuilder();
        this.$Q = new tab.FilterCommandsBuilder();
        this.$V = new tab.SharedUtils();
        this.$R = new tab._Collection();
        this.$U = new tab._Collection();
        this.highlightedMarks = null;
        g.call(this, e, bo, bp);
        this.$T = bq;
      },
      {
        $c: function (e, bo, bp) {
          tab._Param.verifyStringMaxLength(bp.displayName, 'Display Name');
          var bq = new tab._Deferred();
          var br = {};
          br['api.targetMenu'] = bo;
          br['api.menuItemDisplayName'] = bp.displayName;
          br['api.worksheetName'] = e;
          var bs = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object,
          ]))(
            'api.AppendContextMenu',
            0,
            function (bt) {
              bq.resolve(bt.menuItemId);
            },
            function (bt, bu) {
              bq.reject(tab._TableauException.createServerError(bu));
            }
          );
          this.sendCommand(Object).call(this, br, bs);
          return bq.get_promise();
        },
        $y: function (e, bo, bp) {
          var bq = new tab._Deferred();
          var br = {};
          br['api.targetMenu'] = bo;
          br['api.menuItemId'] = bp;
          br['api.worksheetName'] = e;
          var bs = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object,
          ]))(
            'api.RemoveContextMenu',
            0,
            function (bt) {
              bq.resolve();
            },
            function (bt, bu) {
              bq.reject(tab._TableauException.createServerError(bu));
            }
          );
          this.sendCommand(Object).call(this, br, bs);
          return bq.get_promise();
        },
        $k: function (e, bo, bp) {
          var bq = new tab._Deferred();
          var br = {};
          br['api.worksheetName'] = e;
          br['api.targetMenu'] = bo;
          br['api.menuItemId'] = bp;
          var bs = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object,
          ]))(
            'api.ExecuteContextMenu',
            0,
            function (bt) {
              bq.resolve();
            },
            function (bt, bu) {
              bq.reject(tab._TableauException.createServerError(bu));
            }
          );
          this.sendCommand(Object).call(this, br, bs);
          return bq.get_promise();
        },
        get_sheet: function () {
          return this.get_worksheet();
        },
        get_worksheet: function () {
          if (ss.isNullOrUndefined(this.$W)) {
            this.$W = new bn(this);
          }
          return this.$W;
        },
        get_parentDashboardImpl: function () {
          return this.$T;
        },
        get_parentDashboard: function () {
          if (ss.isValue(this.$T)) {
            return this.$T.get_dashboard();
          }
          return null;
        },
        $n: function () {
          this.$O();
          var e = new tab._Deferred();
          var bo = {};
          bo['api.worksheetName'] = this.get_name();
          var bp = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object,
          ]))(
            'api.GetDataSourcesCommand',
            0,
            function (bq) {
              var br = f.processDataSourcesForWorksheet(bq);
              e.resolve(br._toApiCollection());
            },
            function (bq, br) {
              e.reject(tab._TableauException.createServerError(br));
            }
          );
          this.sendCommand(Object).call(this, bo, bp);
          return e.get_promise();
        },
        $m: function (e) {
          this.$O();
          var bo = new tab._Deferred();
          var bp = {};
          bp['api.dataSourceName'] = e;
          bp['api.worksheetName'] = this.get_name();
          var bq = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object,
          ]))(
            'api.GetDataSourceCommand',
            0,
            function (br) {
              var bs = f.processDataSource(br);
              if (ss.isValue(bs)) {
                bo.resolve(bs.get_dataSource());
              } else {
                bo.reject(
                  tab._TableauException.createServerError(
                    "Data source '" + e + "' not found"
                  )
                );
              }
            },
            function (br, bs) {
              bo.reject(tab._TableauException.createServerError(bs));
            }
          );
          this.sendCommand(Object).call(this, bp, bq);
          return bo.get_promise();
        },
        $O: function () {
          var e = this.get_isActive();
          var bo = ss.isValue(this.$T) && this.$T.get_isActive();
          var bp =
            ss.isValue(this.get_parentStoryPointImpl()) &&
            this.get_parentStoryPointImpl()
              .get_parentStoryImpl()
              .get_isActive();
          if (!e && !bo && !bp) {
            throw tab._TableauException.createNotActiveSheet();
          }
        },
        $C: function (e) {
          if (ss.isValue(this.get_parentStoryPointImpl())) {
            var bo = {};
            bo.worksheet = this.get_name();
            bo.dashboard = ss.isValue(this.get_parentDashboardImpl())
              ? this.$T.get_name()
              : this.get_name();
            bo.flipboardZoneId = this.get_parentStoryPointImpl()
              .get_containedSheetImpl()
              .get_zoneId();
            bo.storyboard = this.get_parentStoryPointImpl()
              .get_parentStoryImpl()
              .get_name();
            bo.storyPointId =
              this.get_parentStoryPointImpl().get_storyPointId();
            e['api.visualId'] = bo;
          } else {
            var bp = ss.isValue(this.get_parentDashboardImpl())
              ? this.get_parentDashboardImpl().get_name()
              : null;
            this.$V.addVisualIdForWorksheet(e, this.get_name(), bp);
          }
        },
        get__filters: function () {
          return this.$R;
        },
        set__filters: function (e) {
          this.$R = e;
        },
        $o: function (e, bo, bp) {
          if (
            !tab._Utility.isNullOrEmpty(e) &&
            !tab._Utility.isNullOrEmpty(bo)
          ) {
            throw tab._TableauException.createInternalError(
              'Only fieldName OR fieldCaption is allowed, not both.'
            );
          }
          bp = bp || new Object();
          var bq = new tab._Deferred();
          var br = {};
          this.$C(br);
          if (
            !tab._Utility.isNullOrEmpty(bo) &&
            tab._Utility.isNullOrEmpty(e)
          ) {
            br['api.fieldCaption'] = bo;
          }
          if (!tab._Utility.isNullOrEmpty(e)) {
            br['api.fieldName'] = e;
          }
          br['api.filterHierarchicalLevels'] = 0;
          br['api.ignoreDomain'] = bp.ignoreDomain || false;
          br['api.filterRelevantValuesOnly'] = ss.isNullOrUndefined(
            bp.relevantValuesOnly
          )
            ? true
            : bp.relevantValuesOnly;
          var bs = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object,
          ]))(
            'api.GetOneFilterInfoCommand',
            0,
            ss.mkdel(this, function (bt) {
              var bu = p.$0(bt);
              if (ss.isNullOrUndefined(bu)) {
                var bv = bt;
                var bw = Y.$0(this, bv);
                bq.resolve(bw);
              } else {
                bq.reject(bu);
              }
            }),
            function (bt, bu) {
              bq.reject(tab._TableauException.createServerError(bu));
            }
          );
          this.sendCommand(Object).call(this, br, bs);
          return bq.get_promise();
        },
        $p: function (e) {
          this.$O();
          e = e || new Object();
          var bo = new tab._Deferred();
          var bp = {};
          this.$C(bp);
          bp['api.ignoreDomain'] = e.ignoreDomain || false;
          bp['api.filterRelevantValuesOnly'] = ss.isNullOrUndefined(
            e.relevantValuesOnly
          )
            ? true
            : e.relevantValuesOnly;
          var bq = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object,
          ]))(
            'api.GetFiltersListCommand',
            0,
            ss.mkdel(this, function (br) {
              this.set__filters(Y.processFiltersList(this, br));
              bo.resolve(this.get__filters()._toApiCollection());
            }),
            function (br, bs) {
              bo.reject(tab._TableauException.createServerError(bs));
            }
          );
          this.sendCommand(Object).call(this, bp, bq);
          return bo.get_promise();
        },
        $d: function (e, bo, bp, bq) {
          return this.$D(e, bo, bp, bq);
        },
        $h: function (e) {
          return this.$H(e);
        },
        $l: function (e, bo) {
          var bp = new tab._Deferred();
          var bq = function (bs) {
            var bt = bs;
            var bu = [];
            if (ss.isValue(bt.sharedFilterWorksheetInfoList)) {
              for (
                var bv = 0;
                bv < bt.sharedFilterWorksheetInfoList.length;
                bv++
              ) {
                var bw = bt.sharedFilterWorksheetInfoList[bv];
                if (bw.isSelected) {
                  bu.push(bw.worksheetName);
                }
              }
            }
            bp.resolve(bu);
          };
          var br = function (bs, bt) {
            bp.reject(tab._TableauException.createServerError(bt));
          };
          this.$P(Array).call(this, e, bo, bq, br);
          return bp.get_promise();
        },
        $A: function (e, bo, bp, bq) {
          if (ss.isNullOrUndefined(e)) {
            throw tab._TableauException.createInvalidParameter('Worksheet');
          }
          var br = new tab._Deferred();
          e = this.$I(e);
          var bs = ss.mkdel(this, function (bu) {
            var bv = bu;
            var bw = new String();
            var bx = [];
            var by = [];
            if (!ss.isValue(bv.sharedFilterWorksheetInfoList)) {
              br.reject(
                tab._TableauException.createServerError(
                  'The server returned empty pres model for getAppliedWorksheetsAsync()'
                )
              );
              return;
            }
            for (
              var bz = 0;
              bz < bv.sharedFilterWorksheetInfoList.length;
              bz++
            ) {
              var bA = bv.sharedFilterWorksheetInfoList[bz];
              if (bA.isActive) {
                bw = bA.worksheetName;
              }
              if (bA.isSelected) {
                bx.push(bA.worksheetName);
              } else if (bA.isEnabled) {
                by.push(bA.worksheetName);
              }
            }
            if (!ss.contains(e, bw)) {
              var bB = bw + ' must be included in the applied worksheets';
              br.reject(tab._TableauException.createInternalError(bB));
              return;
            }
            for (var bC = 0; bC < e.length; bC++) {
              var bD = e[bC];
              if (!ss.contains(bx, bD) && !ss.contains(by, bD)) {
                var bE =
                  'The field ' +
                  bq +
                  " isn't applicable to the worksheet " +
                  bD;
                br.reject(tab._TableauException.createInternalError(bE));
                return;
              }
            }
            var bF = {};
            bF['api.fieldName'] = bp;
            bF['api.sharedFilterSheets'] = e;
            this.$C(bF);
            var bG = function (bJ) {
              br.resolve(e);
            };
            var bH = function (bJ, bK) {
              br.reject(tab._TableauException.createServerError(bK));
            };
            var bI = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
              Object,
            ]))('api.SetAppliedWorksheetsCommand', 0, bG, bH);
            this.sendCommand(Object).call(this, bF, bI);
          });
          var bt = function (bu, bv) {
            br.reject(tab._TableauException.createServerError(bv));
          };
          this.$P(Array).call(this, bo, bp, bs, bt);
          return br.get_promise();
        },
        $I: function (e) {
          var bo = new Set();
          var bp = [];
          for (var bq = 0; bq < e.length; bq++) {
            var br = e[bq];
            if (bo.has(br)) {
              continue;
            }
            bo.add(br);
            bp.push(br);
          }
          return bp;
        },
        $P: function (e) {
          return function (bo, bp, bq, br) {
            var bs = {};
            bs['api.fieldName'] = bp;
            this.$C(bs);
            var bt = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
              Object,
            ]))('api.GetAppliedWorksheetsCommand', 0, bq, br);
            this.sendCommand(Object).call(this, bs, bt);
          };
        },
        $f: function (e, bo) {
          var bp = this.$Q.normalizeRangeFilterOption(bo);
          return this.$F(e, bp);
        },
        $g: function (e, bo) {
          var bp = this.$Q.normalizeRelativeDateFilterOptions(bo);
          return this.$G(e, bp);
        },
        $e: function (e, bo, bp, bq) {
          if (ss.isNullOrUndefined(bo) && bp !== 'all') {
            throw tab._TableauException.createInvalidParameter('values');
          }
          return this.$E(e, bo, bp, bq);
        },
        $H: function (e) {
          this.$O();
          var bo = new tab._Deferred();
          var bp = this.$Q.buildClearFilterCommandsParam(e);
          this.$C(bp);
          var bq = this.$Q.createFilterCommandReturnHandler(
            'api.ClearFilterCommand',
            e,
            bo
          );
          this.sendCommand(Object).call(this, bp, bq);
          return bo.get_promise();
        },
        $D: function (e, bo, bp, bq) {
          this.$O();
          var br = new tab._Deferred();
          var bs = this.$Q.buildApplyFiltersCommandParams(e, bo, bp, bq);
          this.$C(bs);
          var bt = this.$Q.createFilterCommandReturnHandler(
            'api.ApplyCategoricalFilterCommand',
            e,
            br
          );
          this.sendCommand(Object).call(this, bs, bt);
          return br.get_promise();
        },
        $F: function (e, bo) {
          this.$O();
          var bp = this.$Q.buildRangeFilterCommandParams(e, bo);
          this.$C(bp);
          var bq = new tab._Deferred();
          var br = this.$Q.createFilterCommandReturnHandler(
            'api.ApplyRangeFilterCommand',
            e,
            bq
          );
          this.sendCommand(Object).call(this, bp, br);
          return bq.get_promise();
        },
        $G: function (e, bo) {
          this.$O();
          var bp = this.$Q.buildRelativeDateFilterCommandParams(e, bo);
          this.$C(bp);
          var bq = new tab._Deferred();
          var br = this.$Q.createFilterCommandReturnHandler(
            'api.ApplyRelativeDateFilterCommand',
            e,
            bq
          );
          this.sendCommand(Object).call(this, bp, br);
          return bq.get_promise();
        },
        $E: function (e, bo, bp, bq) {
          this.$O();
          var br = this.$Q.buildHierarchicalFilterCommandParams(e, bo, bp, bq);
          this.$C(br);
          var bs = new tab._Deferred();
          var bt = this.$Q.createFilterCommandReturnHandler(
            'api.ApplyHierarchicalFilterCommand',
            e,
            bs
          );
          this.sendCommand(Object).call(this, br, bt);
          return bs.get_promise();
        },
        get_selectedMarks: function () {
          return this.$U;
        },
        set_selectedMarks: function (e) {
          this.$U = e;
        },
        $j: function () {
          this.$O();
          var e = new tab._Deferred();
          var bo = {};
          this.$C(bo);
          var bp = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object,
          ]))(
            'api.ClearSelectedMarksCommand',
            0,
            function (bq) {
              e.resolve();
            },
            function (bq, br) {
              e.reject(tab._TableauException.createServerError(br));
            }
          );
          this.sendCommand(Object).call(this, bo, bp);
          return e.get_promise();
        },
        $z: function (e, bo, bp) {
          this.$O();
          if (ss.isNullOrUndefined(e) && ss.isNullOrUndefined(bo)) {
            return this.$j();
          }
          if (
            tab._Utility.isString(e) &&
            (tab._jQueryShim.isArray(bo) ||
              tab._Utility.isString(bo) ||
              !tab.PublicEnums.isValidEnum(tab.ApiSelectionUpdateType).call(
                null,
                bo
              ))
          ) {
            return this.$K(e, bo, bp);
          } else if (tab._jQueryShim.isArray(e)) {
            return this.$L(e, bo);
          } else {
            return this.$M(e, bo);
          }
        },
        $r: function () {
          this.$O();
          var e = new tab._Deferred();
          var bo = {};
          this.$C(bo);
          var bp = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object,
          ]))(
            'api.FetchSelectedMarksCommand',
            0,
            ss.mkdel(this, function (bq) {
              this.$U = tab.MarkImpl.processActiveMarks(bq);
              e.resolve(this.$U._toApiCollection());
            }),
            function (bq, br) {
              e.reject(tab._TableauException.createServerError(br));
            }
          );
          this.sendCommand(Object).call(this, bo, bp);
          return e.get_promise();
        },
        $K: function (e, bo, bp) {
          var bq = [];
          var br = [];
          var bs = [];
          var bt = [];
          var bu = [];
          var bv = [];
          this.$J(bq, br, bs, bt, bu, bv, e, bo);
          return this.$N(null, bq, br, bs, bt, bu, bv, bp);
        },
        $M: function (e, bo) {
          var bp = e;
          var bq = [];
          var br = [];
          var bs = [];
          var bt = [];
          var bu = [];
          var bv = [];
          var bw = new ss.ObjectEnumerator(bp);
          try {
            while (bw.moveNext()) {
              var bx = bw.current();
              if (e.hasOwnProperty(bx.key)) {
                if (!tab._jQueryShim.isFunction(bp[bx.key])) {
                  this.$J(bq, br, bs, bt, bu, bv, bx.key, bx.value);
                }
              }
            }
          } finally {
            bw.dispose();
          }
          return this.$N(null, bq, br, bs, bt, bu, bv, bo);
        },
        $L: function (e, bo) {
          var bp = [];
          var bq = [];
          var br = [];
          var bs = [];
          var bt = [];
          var bu = [];
          var bv = [];
          for (var bw = 0; bw < e.length; bw++) {
            var bx = e[bw];
            if (
              ss.isValue(bx.impl.get_tupleId()) &&
              bx.impl.get_tupleId() > 0
            ) {
              bv.push(bx.impl.get_tupleId());
            } else {
              var by = bx.impl.get_pairs();
              for (var bz = 0; bz < by.get__length(); bz++) {
                var bA = by.get_item(bz);
                if (
                  bA.hasOwnProperty('fieldName') &&
                  bA.hasOwnProperty('value') &&
                  !tab._jQueryShim.isFunction(bA.fieldName) &&
                  !tab._jQueryShim.isFunction(bA.value)
                ) {
                  this.$J(bp, bq, br, bs, bt, bu, bA.fieldName, bA.value);
                }
              }
            }
          }
          return this.$N(bv, bp, bq, br, bs, bt, bu, bo);
        },
        $J: function (e, bo, bp, bq, br, bs, bt, bu) {
          var bv = bu;
          if (p.$3.test(bt)) {
            this.$B(bp, bq, bt, bu);
          } else if (ss.isValue(bv.min) || ss.isValue(bv.max)) {
            var bw = new Object();
            if (ss.isValue(bv.min)) {
              if (tab._Utility.isDate(bv.min)) {
                var bx = bv.min;
                if (tab._Utility.isDateValid(bx)) {
                  bw.min = tab._Utility.serializeDateForServer(bx);
                } else {
                  throw tab._TableauException.createInvalidDateParameter(
                    'options.min'
                  );
                }
              } else {
                bw.min = bv.min;
              }
            }
            if (ss.isValue(bv.max)) {
              if (tab._Utility.isDate(bv.max)) {
                var by = bv.max;
                if (tab._Utility.isDateValid(by)) {
                  bw.max = tab._Utility.serializeDateForServer(by);
                } else {
                  throw tab._TableauException.createInvalidDateParameter(
                    'options.max'
                  );
                }
              } else {
                bw.max = bv.max;
              }
            }
            if (ss.isValue(bv.nullOption)) {
              var bz = tab.PublicEnums.normalizeEnum(tab.ApiNullOption).call(
                null,
                bv.nullOption,
                'options.nullOption'
              );
              bw.nullOption = bz;
            } else {
              bw.nullOption = 'allValues';
            }
            var bA = JSON.stringify(bw);
            this.$B(br, bs, bt, bA);
          } else {
            this.$B(e, bo, bt, bu);
          }
        },
        $B: function (e, bo, bp, bq) {
          var br = [];
          if (tab._jQueryShim.isArray(bq)) {
            var bs = bq;
            for (var bt = 0; bt < bs.length; bt++) {
              br.push(bs[bt].toString());
            }
          } else {
            br.push(bq.toString());
          }
          bo.push(br);
          e.push(bp);
        },
        $N: function (e, bo, bp, bq, br, bs, bt, bu) {
          var bv = {};
          this.$C(bv);
          bu = tab.PublicEnums.normalizeEnum(tab.ApiSelectionUpdateType).call(
            null,
            bu,
            'updateType'
          );
          bv['api.filterUpdateType'] = bu;
          if (!tab._Utility.isNullOrEmpty(e)) {
            bv['api.tupleIds'] = JSON.stringify(e);
          }
          if (
            !tab._Utility.isNullOrEmpty(bo) &&
            !tab._Utility.isNullOrEmpty(bp)
          ) {
            bv['api.categoricalFieldCaption'] = JSON.stringify(bo);
            var bw = [];
            for (var bx = 0; bx < bp.length; bx++) {
              var by = JSON.stringify(bp[bx]);
              bw.push(by);
            }
            bv['api.categoricalMarkValues'] = JSON.stringify(bw);
          }
          if (
            !tab._Utility.isNullOrEmpty(bq) &&
            !tab._Utility.isNullOrEmpty(br)
          ) {
            bv['api.hierarchicalFieldCaption'] = JSON.stringify(bq);
            var bz = [];
            for (var bA = 0; bA < br.length; bA++) {
              var bB = JSON.stringify(br[bA]);
              bz.push(bB);
            }
            bv['api.hierarchicalMarkValues'] = JSON.stringify(bz);
          }
          if (
            !tab._Utility.isNullOrEmpty(bs) &&
            !tab._Utility.isNullOrEmpty(bt)
          ) {
            bv['api.rangeFieldCaption'] = JSON.stringify(bs);
            var bC = [];
            for (var bD = 0; bD < bt.length; bD++) {
              var bE = JSON.stringify(bt[bD]);
              bC.push(bE);
            }
            bv['api.rangeMarkValues'] = JSON.stringify(bC);
          }
          if (
            tab._Utility.isNullOrEmpty(bv['api.tupleIds']) &&
            tab._Utility.isNullOrEmpty(bv['api.categoricalFieldCaption']) &&
            tab._Utility.isNullOrEmpty(bv['api.hierarchicalFieldCaption']) &&
            tab._Utility.isNullOrEmpty(bv['api.rangeFieldCaption'])
          ) {
            throw tab._TableauException.createInvalidParameter(
              'fieldNameOrFieldValuesMap'
            );
          }
          var bF = new tab._Deferred();
          var bG = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object,
          ]))(
            'api.SelectMarksCommand',
            0,
            function (bH) {
              var bI = p.$1(bH);
              if (ss.isNullOrUndefined(bI)) {
                bF.resolve();
              } else {
                bF.reject(bI);
              }
            },
            function (bH, bI) {
              bF.reject(tab._TableauException.createServerError(bI));
            }
          );
          this.sendCommand(Object).call(this, bv, bG);
          return bF.get_promise();
        },
        $s: function (e) {
          this.$O();
          var bo = new tab._Deferred();
          var bp = this.$S.getSummaryDataCommandParams(e);
          this.$C(bp);
          var bq = this.$S.getSummaryDataResponseHandler(bo);
          this.sendCommand(Object).call(this, bp, bq);
          return bo.get_promise();
        },
        $t: function (e) {
          this.$O();
          var bo = new tab._Deferred();
          var bp = this.$S.getUnderlyingDataCommandParams(e);
          this.$C(bp);
          var bq = this.$S.getUnderlyingDataResponseHandler(bo);
          this.sendCommand(Object).call(this, bp, bq);
          return bo.get_promise();
        },
        $v: function () {
          this.$O();
          var e = new tab._Deferred();
          var bo = this.$S.getUnderlyingTablesCommandParams();
          this.$C(bo);
          var bp = this.$S.getUnderlyingTablesResponseHandler(e);
          this.sendCommand(Object).call(this, bo, bp);
          return e.get_promise();
        },
        $u: function (e, bo) {
          this.$O();
          var bp = new tab._Deferred();
          var bq = this.$S.getUnderlyingTableDataCommandParams(e, bo);
          this.$C(bq);
          var br = this.$S.getUnderlyingTableDataResponseHandler(bp);
          this.sendCommand(Object).call(this, bq, br);
          return bp.get_promise();
        },
        $i: function () {
          this.$O();
          var e = new tab._Deferred();
          var bo = {};
          this.$C(bo);
          var bp = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object,
          ]))(
            'api.ClearHighlightedMarksCommand',
            0,
            function (bq) {
              e.resolve();
            },
            function (bq, br) {
              e.reject(tab._TableauException.createServerError(br));
            }
          );
          this.sendCommand(Object).call(this, bo, bp);
          return e.get_promise();
        },
        $w: function (e, bo) {
          tab._Param.verifyString(e, 'fieldName');
          this.$O();
          var bp = new tab._Deferred();
          var bq = {};
          bq['api.fieldCaption'] = e;
          bq['api.ObjectTextIDs'] = bo;
          this.$C(bq);
          var br = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object,
          ]))(
            'api.HighlightMarksCommand',
            0,
            function (bs) {
              bp.resolve();
            },
            function (bs, bt) {
              bp.reject(tab._TableauException.createServerError(bt));
            }
          );
          this.sendCommand(Object).call(this, bq, br);
          return bp.get_promise();
        },
        $x: function (e, bo) {
          tab._Param.verifyString(e, 'fieldName');
          tab._Param.verifyString(bo, 'patternMatch');
          this.$O();
          var bp = new tab._Deferred();
          var bq = {};
          bq['api.filterUpdateType'] = 'replace';
          bq['api.fieldCaption'] = e;
          bq['api.Pattern'] = bo;
          this.$C(bq);
          var br = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object,
          ]))(
            'api.HighlightMarksByPatternMatch',
            0,
            function (bs) {
              bp.resolve();
            },
            function (bs, bt) {
              bp.reject(tab._TableauException.createServerError(bt));
            }
          );
          this.sendCommand(Object).call(this, bq, br);
          return bp.get_promise();
        },
        $q: function () {
          this.$O();
          var e = new tab._Deferred();
          var bo = {};
          this.$C(bo);
          var bp = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object,
          ]))(
            'api.FetchHighlightedMarksCommand',
            0,
            ss.mkdel(this, function (bq) {
              this.highlightedMarks = tab.MarkImpl.processActiveMarks(bq);
              e.resolve(this.highlightedMarks._toApiCollection());
            }),
            function (bq, br) {
              e.reject(tab._TableauException.createServerError(br));
            }
          );
          this.sendCommand(Object).call(this, bo, bp);
          return e.get_promise();
        },
      },
      {
        $0: function (e) {
          var bo = e;
          if (ss.isValue(bo) && ss.isValue(bo.errorCode)) {
            var bp = ss.isValue(bo.additionalInformation)
              ? bo.additionalInformation.toString()
              : '';
            switch (bo.errorCode) {
              case 'invalidFilterFieldName': {
                return tab._TableauException.create(
                  'invalidFilterFieldName',
                  bp
                );
              }
              case 'invalidFilterFieldValue': {
                return tab._TableauException.create(
                  'invalidFilterFieldValue',
                  bp
                );
              }
              case 'invalidAggregationFieldName': {
                return tab._TableauException.createInvalidAggregationFieldName(
                  bp
                );
              }
              default: {
                return tab._TableauException.createServerError(bp);
              }
            }
          }
          return null;
        },
        $1: function (e) {
          var bo = e;
          if (ss.isValue(bo) && ss.isValue(bo.errorCode)) {
            var bp = ss.isValue(bo.additionalInformation)
              ? bo.additionalInformation.toString()
              : '';
            switch (bo.errorCode) {
              case 'invalidSelectionFieldName': {
                return tab._TableauException.create(
                  'invalidSelectionFieldName',
                  bp
                );
              }
              case 'invalidSelectionValue': {
                return tab._TableauException.create(
                  'invalidSelectionValue',
                  bp
                );
              }
              case 'invalidSelectionDate': {
                return tab._TableauException.create('invalidSelectionDate', bp);
              }
            }
          }
          return null;
        },
      }
    ));
    var q = ss.mkType(
      a,
      'tab.$0',
      function (e, bo) {
        this.$2 = null;
        z.call(this, e, null);
        this.$2 = bo;
      },
      {
        get__customViewImpl: function () {
          return this.$2;
        },
      }
    );
    var r = ss.mkType(
      a,
      'tab.$1',
      function (e, bo, bp, bq) {
        this.$3 = null;
        this.$4 = null;
        z.call(this, e, bo);
        this.$3 = bp;
        this.$4 = bq;
      },
      {
        get__filterFieldName: function () {
          return this.$3;
        },
        $2: function () {
          return this.$4;
        },
      }
    );
    var s = ss.mkType(a, 'tab.$2', function (e, bo) {
      z.call(this, e, bo);
    });
    var t = ss.mkType(a, 'tab.$3', function (e, bo) {
      z.call(this, e, bo);
    });
    var u = ss.mkType(
      a,
      'tab.$4',
      function (e, bo) {
        this.$2 = null;
        z.call(this, e, null);
        this.$2 = bo;
      },
      {
        get__parameterName: function () {
          return this.$2;
        },
      }
    );
    var v = ss.mkType(a, 'tab.$5', null, null, {
      isInstanceOfType: function () {
        return true;
      },
    });
    var w = ss.mkType(
      a,
      'tab.$6',
      function (e) {
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
        this.$c = tab._Utility.getDataValue(e.currentValue);
        this.$d = tab.ApiEnumConverter.convertParameterDataType(e.dataType);
        this.$b = tab.ApiEnumConverter.convertParameterAllowableValuesType(
          e.allowableValuesType
        );
        if (ss.isValue(e.allowableValues) && this.$b === 'list') {
          this.$a = [];
          for (var bo = 0; bo < e.allowableValues.length; bo++) {
            var bp = e.allowableValues[bo];
            this.$a.push(tab._Utility.getDataValue(bp));
          }
        }
        if (this.$b === 'range') {
          this.$g = tab._Utility.getDataValue(e.minValue);
          this.$f = tab._Utility.getDataValue(e.maxValue);
          this.$j = e.stepSize;
          if (
            (this.$d === 'date' || this.$d === 'datetime') &&
            ss.isValue(this.$j) &&
            ss.isValue(e.dateStepPeriod)
          ) {
            this.$e = tab.ApiEnumConverter.convertPeriodType(e.dateStepPeriod);
          }
        }
      },
      {
        $8: function () {
          if (ss.isNullOrUndefined(this.$i)) {
            this.$i = new ba(this);
          }
          return this.$i;
        },
        $7: function () {
          return this.$h;
        },
        $2: function () {
          return this.$c;
        },
        $3: function () {
          return this.$d;
        },
        $1: function () {
          return this.$b;
        },
        $0: function () {
          return this.$a;
        },
        $6: function () {
          return this.$g;
        },
        $5: function () {
          return this.$f;
        },
        $9: function () {
          return this.$j;
        },
        $4: function () {
          return this.$e;
        },
      }
    );
    var x = (global.tab.CustomMarkContextMenuEvent = ss.mkType(
      a,
      'tab.CustomMarkContextMenuEvent',
      function (e, bo, bp, bq) {
        this.$2 = null;
        this.$3 = null;
        K.call(this, e, bo);
        this.$2 = bp;
        this.$3 = bq;
      },
      {
        getContextMenuId: function () {
          return this.$2;
        },
        getSelectedMarksAsync: function () {
          var e = this.$3;
          if (ss.isValue(e.get_selectedMarks())) {
            var bo = new tab._Deferred();
            return bo.resolve(e.get_selectedMarks()._toApiCollection());
          }
          return e.$r();
        },
      }
    ));
    var y = (global.tab.CustomViewEvent = ss.mkType(
      a,
      'tab.CustomViewEvent',
      function (e, bo, bp) {
        this.$2 = null;
        K.call(this, e, bo);
        this.$2 = new q(bo._impl.get__workbookImpl(), bp);
      },
      {
        getCustomViewAsync: function () {
          var e = new tab._Deferred();
          var bo = null;
          if (ss.isValue(this.$2.get__customViewImpl())) {
            bo = this.$2.get__customViewImpl().$3();
          }
          e.resolve(bo);
          return e.get_promise();
        },
      }
    ));
    var z = (global.tab.EventContext = ss.mkType(
      a,
      'tab.EventContext',
      function (e, bo) {
        this.$0 = null;
        this.$1 = null;
        this.$0 = e;
        this.$1 = bo;
      },
      {
        get__workbookImpl: function () {
          return this.$0;
        },
        get__worksheetImpl: function () {
          return this.$1;
        },
      }
    ));
    var A = (global.tab.FilterEvent = ss.mkType(
      a,
      'tab.FilterEvent',
      function (e, bo, bp, bq, br) {
        this.$4 = null;
        this.$3 = null;
        R.call(this, e, bo, bp);
        this.$4 = br;
        this.$3 = new r(bo._impl.get__workbookImpl(), bp, bq, br);
      },
      {
        getFieldName: function () {
          return this.$4;
        },
        getFilterAsync: function () {
          return this.$3
            .get__worksheetImpl()
            .$o(this.$3.get__filterFieldName(), null, null);
        },
      }
    ));
    var B = (global.tab.FirstVizSizeKnownEvent = ss.mkType(
      a,
      'tab.FirstVizSizeKnownEvent',
      function (e, bo, bp) {
        this.$2 = null;
        K.call(this, e, bo);
        this.$2 = bp;
      },
      {
        getVizSize: function () {
          return this.$2;
        },
      }
    ));
    var C = (global.tab.HighlightEvent = ss.mkType(
      a,
      'tab.HighlightEvent',
      function (e, bo, bp) {
        this.$3 = null;
        R.call(this, e, bo, bp);
        this.$3 = new s(bo._impl.get__workbookImpl(), bp);
      },
      {
        getHighlightedMarksAsync: function () {
          var e = this.$3.get__worksheetImpl();
          return e.$q();
        },
      }
    ));
    var D = (global.tab.IJsApiMessageHandler = ss.mkType(
      a,
      'tab.IJsApiMessageHandler'
    ));
    var E = (global.tab.JsApiMessageRouter = ss.mkType(
      a,
      'tab.JsApiMessageRouter',
      function () {
        this.$3 = {};
        this.$2 = null;
        var e = ss.mkdel(this, function (bo, bp) {
          var bq = ss.safeCast(bp, D);
          this.$1(bo, bq);
        });
        this.$2 = new tab.CrossDomainMessager(e);
      },
      {
        registerHandler: function (e) {
          this.$2.registerHandler(e);
          e.add_customViewsListLoad(ss.mkdel(this, this.$0));
        },
        unregisterHandler: function (e) {
          this.$2.unregisterHandler(e);
          e.remove_customViewsListLoad(ss.mkdel(this, this.$0));
        },
        sendCommand: function (e) {
          return function (bo, bp, bq) {
            this.$2.sendCommand(e).call(this.$2, bo, bp, bq);
            if (bq.get_commandName() === 'api.ShowCustomViewCommand') {
              var br = this.$3[bo.get_hostId()];
              if (ss.isNullOrUndefined(br)) {
                br = [];
                this.$3[bo.get_hostId()] = br;
              }
              br.push(bq);
            }
          };
        },
        $0: function (e) {
          var bo = e.get_hostId();
          var bp = this.$3[bo];
          if (ss.isNullOrUndefined(bp)) {
            return;
          }
          for (var bq = 0; bq < bp.length; bq++) {
            var br = bp[bq];
            if (!ss.staticEquals(br.get_successCallback(), null)) {
              br.get_successCallback()(null);
            }
          }
          delete this.$3[bo];
        },
        $1: function (e, bo) {
          if (e.get_name() === 'layoutInfoReq') {
            m.$1();
          } else if (ss.isValue(bo)) {
            if (
              e.get_name() === 'tableau.completed' ||
              e.get_name() === 'completed'
            ) {
              bo.handleVizLoad();
            } else if (e.get_name() === 'tableau.listening') {
              bo.handleVizListening();
            } else if (e.get_name() === 'sf?') {
              if (ss.count(e.get_parameters()) > 0) {
                var bp = ss.getItem(e.get_parameters(), 0);
                bo.sendScaleFactor(bp);
              }
            }
          }
        },
      }
    ));
    var F = (global.tab.JsApiMessagingOptions = ss.mkType(
      a,
      'tab.JsApiMessagingOptions',
      function (e, bo) {
        this.$1 = null;
        this.$0 = null;
        tab._Param.verifyValue(e, 'router');
        tab._Param.verifyValue(bo, 'handler');
        this.$1 = e;
        this.$0 = bo;
      },
      {
        get_handler: function () {
          return this.$0;
        },
        get_router: function () {
          return this.$1;
        },
        sendCommand: function (e) {
          return function (bo, bp) {
            this.$1.sendCommand(e).call(this.$1, this.$0, bo, bp);
          };
        },
        dispose: function () {
          this.$1.unregisterHandler(this.$0);
        },
      }
    ));
    var G = (global.tab.MarksEvent = ss.mkType(
      a,
      'tab.MarksEvent',
      function (e, bo, bp) {
        this.$3 = null;
        R.call(this, e, bo, bp);
        this.$3 = new t(bo._impl.get__workbookImpl(), bp);
      },
      {
        getMarksAsync: function () {
          var e = this.$3.get__worksheetImpl();
          if (ss.isValue(e.get_selectedMarks())) {
            var bo = new tab._Deferred();
            return bo.resolve(e.get_selectedMarks()._toApiCollection());
          }
          return e.$r();
        },
      }
    ));
    var H = (global.tab.ParameterEvent = ss.mkType(
      a,
      'tab.ParameterEvent',
      function (e, bo, bp) {
        this.$2 = null;
        K.call(this, e, bo);
        this.$2 = new u(bo._impl.get__workbookImpl(), bp);
      },
      {
        getParameterName: function () {
          return this.$2.get__parameterName();
        },
        getParameterAsync: function () {
          return this.$2.get__workbookImpl().$6(this.$2.get__parameterName());
        },
      }
    ));
    var I = (global.tab.StoryPointInfoImplUtil = ss.mkType(
      a,
      'tab.StoryPointInfoImplUtil',
      null,
      null,
      {
        clone: function (e) {
          return k.$ctor(
            e.caption,
            e.index,
            e.storyPointId,
            e.isActive,
            e.isUpdated,
            e.parentStoryImpl
          );
        },
      }
    ));
    var J = (global.tab.StoryPointSwitchEvent = ss.mkType(
      a,
      'tab.StoryPointSwitchEvent',
      function (e, bo, bp, bq) {
        this.$3 = null;
        this.$2 = null;
        K.call(this, e, bo);
        this.$3 = bp;
        this.$2 = bq;
      },
      {
        getOldStoryPointInfo: function () {
          return this.$3;
        },
        getNewStoryPoint: function () {
          return this.$2;
        },
      }
    ));
    var K = (global.tab.TableauEvent = ss.mkType(
      a,
      'tab.TableauEvent',
      function (e, bo) {
        this.$1 = null;
        this.$0 = null;
        this.$1 = bo;
        this.$0 = e;
      },
      {
        getViz: function () {
          return this.$1;
        },
        getEventName: function () {
          return this.$0;
        },
      }
    ));
    var L = (global.tab.TabSwitchEvent = ss.mkType(
      a,
      'tab.TabSwitchEvent',
      function (e, bo, bp, bq) {
        this.$3 = null;
        this.$2 = null;
        K.call(this, e, bo);
        this.$3 = bp;
        this.$2 = bq;
      },
      {
        getOldSheetName: function () {
          return this.$3;
        },
        getNewSheetName: function () {
          return this.$2;
        },
      }
    ));
    var M = (global.tab.ToolbarStateEvent = ss.mkType(
      a,
      'tab.ToolbarStateEvent',
      function (e, bo, bp) {
        this.$2 = null;
        K.call(this, e, bo);
        this.$2 = bp;
      },
      {
        getToolbarState: function () {
          return this.$2.get_toolbarState();
        },
      }
    ));
    var N = (global.tab.UrlActionEvent = ss.mkType(
      a,
      'tab.UrlActionEvent',
      function (e, bo, bp, bq) {
        this.$3 = null;
        this.$2 = null;
        K.call(this, e, bo);
        this.$3 = bp;
        this.$2 = bq;
      },
      {
        getUrl: function () {
          return this.$3;
        },
        getTarget: function () {
          return this.$2;
        },
      }
    ));
    var O = (global.tab.VizImpl = ss.mkType(
      a,
      'tab.VizImpl',
      function (e, bo, bp, bq, br) {
        this.$B = null;
        this.$1w = null;
        this.$1l = null;
        this.$1v = null;
        this.$1u = null;
        this.$1m = null;
        this.$1o = null;
        this.$1z = null;
        this.$1s = null;
        this.$1t = null;
        this.$1r = false;
        this.$1k = false;
        this.$1p = false;
        this.$1j = false;
        this.$1q = null;
        this.$1x = null;
        this.$1y = null;
        this.$1n = false;
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
        this.$1$15 = null;
        this.$1$16 = null;
        if (
          !tab._Utility.hasWindowPostMessage() ||
          !tab._Utility.hasJsonParse()
        ) {
          throw tab._TableauException.createBrowserNotCapable();
        }
        this.$1q = new F(e, this);
        this.$1w = bo;
        if (ss.isNullOrUndefined(bp) || bp.nodeType !== 1) {
          bp = document.body;
        }
        this.$1u = new n(bp, bq, br);
        if (ss.isValue(br)) {
          this.$1s = br.onFirstInteractive;
          this.$1t = br.onFirstVizSizeKnown;
        }
      },
      {
        add_customViewsListLoad: function (e) {
          this.$1$1 = ss.delegateCombine(this.$1$1, e);
        },
        remove_customViewsListLoad: function (e) {
          this.$1$1 = ss.delegateRemove(this.$1$1, e);
        },
        add_stateReadyForQuery: function (e) {
          this.$1$2 = ss.delegateCombine(this.$1$2, e);
        },
        remove_stateReadyForQuery: function (e) {
          this.$1$2 = ss.delegateRemove(this.$1$2, e);
        },
        $1O: function (e) {
          this.$1$3 = ss.delegateCombine(this.$1$3, e);
        },
        $1P: function (e) {
          this.$1$3 = ss.delegateRemove(this.$1$3, e);
        },
        $1M: function (e) {
          this.$1$4 = ss.delegateCombine(this.$1$4, e);
        },
        $1N: function (e) {
          this.$1$4 = ss.delegateRemove(this.$1$4, e);
        },
        $1K: function (e) {
          this.$1$5 = ss.delegateCombine(this.$1$5, e);
        },
        $1L: function (e) {
          this.$1$5 = ss.delegateRemove(this.$1$5, e);
        },
        $1Q: function (e) {
          this.$1$6 = ss.delegateCombine(this.$1$6, e);
        },
        $1R: function (e) {
          this.$1$6 = ss.delegateRemove(this.$1$6, e);
        },
        $1C: function (e) {
          this.$1$7 = ss.delegateCombine(this.$1$7, e);
        },
        $1D: function (e) {
          this.$1$7 = ss.delegateRemove(this.$1$7, e);
        },
        $1G: function (e) {
          this.$1$8 = ss.delegateCombine(this.$1$8, e);
        },
        $1H: function (e) {
          this.$1$8 = ss.delegateRemove(this.$1$8, e);
        },
        $1E: function (e) {
          this.$1$9 = ss.delegateCombine(this.$1$9, e);
        },
        $1F: function (e) {
          this.$1$9 = ss.delegateRemove(this.$1$9, e);
        },
        $1I: function (e) {
          this.$1$10 = ss.delegateCombine(this.$1$10, e);
        },
        $1J: function (e) {
          this.$1$10 = ss.delegateRemove(this.$1$10, e);
        },
        $1U: function (e) {
          this.$1$11 = ss.delegateCombine(this.$1$11, e);
        },
        $1V: function (e) {
          this.$1$11 = ss.delegateRemove(this.$1$11, e);
        },
        $1W: function (e) {
          this.$1$12 = ss.delegateCombine(this.$1$12, e);
        },
        $1X: function (e) {
          this.$1$12 = ss.delegateRemove(this.$1$12, e);
        },
        $1S: function (e) {
          this.$1$13 = ss.delegateCombine(this.$1$13, e);
        },
        $1T: function (e) {
          this.$1$13 = ss.delegateRemove(this.$1$13, e);
        },
        $20: function (e) {
          this.$1$14 = ss.delegateCombine(this.$1$14, e);
        },
        $21: function (e) {
          this.$1$14 = ss.delegateRemove(this.$1$14, e);
        },
        $1Y: function (e) {
          this.$1$15 = ss.delegateCombine(this.$1$15, e);
        },
        $1Z: function (e) {
          this.$1$15 = ss.delegateRemove(this.$1$15, e);
        },
        $1A: function (e) {
          this.$1$16 = ss.delegateCombine(this.$1$16, e);
        },
        $1B: function (e) {
          this.$1$16 = ss.delegateRemove(this.$1$16, e);
        },
        get_hostId: function () {
          return this.$1u.hostId;
        },
        set_hostId: function (e) {
          this.$1u.hostId = e;
        },
        get_iframe: function () {
          return this.$1l;
        },
        get_instanceId: function () {
          return this.$1o;
        },
        set_instanceId: function (e) {
          this.$1o = e;
        },
        $y: function () {
          return this.$1w;
        },
        $t: function () {
          return this.$1k;
        },
        $v: function () {
          return this.$1p;
        },
        $u: function () {
          return this.$1l.style.display === 'none';
        },
        $w: function () {
          return this.$1u.parentElement;
        },
        $x: function () {
          return this.$1u.get_baseUrl();
        },
        $A: function () {
          return this.$1z.get_workbook();
        },
        get__workbookImpl: function () {
          return this.$1z;
        },
        $s: function () {
          return this.$1j;
        },
        $z: function () {
          return this.$1x;
        },
        getCurrentUrlAsync: function () {
          var e = new tab._Deferred();
          var bo = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            String,
          ]))(
            'api.GetCurrentUrlCommand',
            0,
            function (bp) {
              e.resolve(bp);
            },
            function (bp, bq) {
              e.reject(tab._TableauException.createInternalError(bq));
            }
          );
          this._sendCommand(String).call(this, null, bo);
          return e.get_promise();
        },
        handleVizListening: function () {
          this.$3();
        },
        handleVizLoad: function () {
          if (ss.isNullOrUndefined(this.$1x)) {
            this.$1h(this.$1m.width + 'px', this.$1m.height + 'px');
            this.$h();
          }
          if (ss.isValue(this.$1v)) {
            this.$1v.style.display = 'none';
          }
          if (ss.isNullOrUndefined(this.$1z)) {
            this.$1z = new o(
              this,
              this.$1q,
              ss.mkdel(this, function () {
                this.$15(null);
              })
            );
          } else if (!this.$1n) {
            this.$1z._update(
              ss.mkdel(this, function () {
                this.$15(null);
              })
            );
          }
          this.sendScaleFactor('-1');
        },
        $D: function (e) {
          var bo = this.$1x.chromeHeight;
          var bp = this.$1x.sheetSize;
          var bq = 0;
          var br = 0;
          if (bp.behavior === 'exactly') {
            bq = bp.maxSize.width;
            br = bp.maxSize.height + bo;
          } else {
            var bs;
            var bt;
            var bu;
            var bv;
            switch (bp.behavior) {
              case 'range': {
                bs = bp.minSize.width;
                bt = bp.maxSize.width;
                bu = bp.minSize.height + bo;
                bv = bp.maxSize.height + bo;
                bq = Math.max(bs, Math.min(bt, e.width));
                br = Math.max(bu, Math.min(bv, e.height));
                break;
              }
              case 'atleast': {
                bs = bp.minSize.width;
                bu = bp.minSize.height + bo;
                bq = Math.max(bs, e.width);
                br = Math.max(bu, e.height);
                break;
              }
              case 'atmost': {
                bt = bp.maxSize.width;
                bv = bp.maxSize.height + bo;
                bq = Math.min(bt, e.width);
                br = Math.min(bv, e.height);
                break;
              }
              case 'automatic': {
                bq = e.width;
                br = Math.max(e.height, bo);
                break;
              }
              default: {
                throw tab._TableauException.createInternalError(
                  'Unknown SheetSizeBehavior for viz: ' + bp.behavior.toString()
                );
              }
            }
          }
          return tab.Size.$ctor(bq, br);
        },
        $J: function () {
          var e;
          if (ss.isValue(this.$1m)) {
            e = this.$1m;
            this.$1m = null;
          } else {
            e = tab._Utility.computeContentSize(this.$w());
          }
          this.$1f(e);
          return this.$D(e);
        },
        $b: function () {
          if (!ss.isValue(this.$1x)) {
            return;
          }
          var e = this.$J();
          if (e.height === this.$1x.chromeHeight) {
            return;
          }
          this.$1h(e.width + 'px', e.height + 'px');
          var bo = 10;
          for (var bp = 0; bp < bo; bp++) {
            var bq = this.$J();
            if (ss.referenceEquals(JSON.stringify(e), JSON.stringify(bq))) {
              return;
            }
            e = bq;
            this.$1h(e.width + 'px', e.height + 'px');
          }
          throw tab._TableauException.create(
            'maxVizResizeAttempts',
            'Viz resize limit hit. The calculated iframe size did not stabilize after ' +
              bo +
              ' resizes.'
          );
        },
        handleEventNotification: function (e, bo) {
          var bp = tab._ApiServerNotification.deserialize(bo);
          switch (e) {
            case 'api.FirstVizSizeKnownEvent': {
              this.$R(bp);
              break;
            }
            case 'api.VizInteractiveEvent': {
              this.$10(bp);
              break;
            }
            case 'api.MarksSelectionChangedEvent': {
              this.$U(bp);
              break;
            }
            case 'api.MarksHighlightChangedEvent': {
              this.$T(bp);
              break;
            }
            case 'api.FilterChangedEvent': {
              this.$Q(bp);
              break;
            }
            case 'api.ParameterChangedEvent': {
              this.$V(bp);
              break;
            }
            case 'api.CustomViewsListLoadedEvent': {
              this.$P(bp);
              break;
            }
            case 'api.CustomViewUpdatedEvent': {
              this.$O(bp);
              break;
            }
            case 'api.CustomViewRemovedEvent': {
              this.$M();
              break;
            }
            case 'api.CustomViewSetDefaultEvent': {
              this.$N(bp);
              break;
            }
            case 'api.TabSwitchEvent': {
              this.$X(bp);
              break;
            }
            case 'api.ToolbarStateChangedEvent': {
              this.$Y(bp);
              break;
            }
            case 'api.StorytellingStateChangedEvent': {
              this.$W(bp);
              break;
            }
            case 'api.UrlActionEvent': {
              this.$Z(bp);
              break;
            }
            case 'api.CustomMarkMenuEvent': {
              this.$L(bp);
              break;
            }
          }
        },
        addEventListener: function (e, bo) {
          var bp = {};
          if (
            !tab.PublicEnums.tryNormalizeEnum(tab.ApiTableauEventName).call(
              null,
              e,
              bp
            )
          ) {
            throw tab._TableauException.createUnsupportedEventName(
              e.toString()
            );
          }
          switch (bp.$) {
            case 'marksselection': {
              this.$1O(bo);
              break;
            }
            case 'markshighlight': {
              this.$1M(bo);
              break;
            }
            case 'parametervaluechange': {
              this.$1Q(bo);
              break;
            }
            case 'filterchange': {
              this.$1K(bo);
              break;
            }
            case 'customviewload': {
              this.$1C(bo);
              break;
            }
            case 'customviewsave': {
              this.$1G(bo);
              break;
            }
            case 'customviewremove': {
              this.$1E(bo);
              break;
            }
            case 'customviewsetdefault': {
              this.$1I(bo);
              break;
            }
            case 'tabswitch': {
              this.$1U(bo);
              break;
            }
            case 'storypointswitch': {
              this.$1S(bo);
              break;
            }
            case 'toolbarstatechange': {
              this.$1W(bo);
              break;
            }
            case 'vizresize': {
              this.$20(bo);
              break;
            }
            case 'urlaction': {
              this.$1Y(bo);
              break;
            }
            case 'custommarkcontextmenu': {
              this.$1A(bo);
              break;
            }
          }
        },
        removeEventListener: function (e, bo) {
          var bp = {};
          if (
            !tab.PublicEnums.tryNormalizeEnum(tab.ApiTableauEventName).call(
              null,
              e,
              bp
            )
          ) {
            throw tab._TableauException.createUnsupportedEventName(
              e.toString()
            );
          }
          switch (bp.$) {
            case 'marksselection': {
              this.$1P(bo);
              break;
            }
            case 'markshighlight': {
              this.$1N(bo);
              break;
            }
            case 'parametervaluechange': {
              this.$1R(bo);
              break;
            }
            case 'filterchange': {
              this.$1L(bo);
              break;
            }
            case 'customviewload': {
              this.$1D(bo);
              break;
            }
            case 'customviewsave': {
              this.$1H(bo);
              break;
            }
            case 'customviewremove': {
              this.$1F(bo);
              break;
            }
            case 'customviewsetdefault': {
              this.$1J(bo);
              break;
            }
            case 'tabswitch': {
              this.$1V(bo);
              break;
            }
            case 'toolbarstatechange': {
              this.$1X(bo);
              break;
            }
            case 'storypointswitch': {
              this.$1T(bo);
              break;
            }
            case 'vizresize': {
              this.$21(bo);
              break;
            }
            case 'urlaction': {
              this.$1Z(bo);
              break;
            }
            case 'custommarkcontextmenu': {
              this.$1B(bo);
              break;
            }
          }
        },
        $2: function () {
          if (ss.isValue(this.$1l)) {
            this.$1l.parentNode.removeChild(this.$1l);
            this.$1l = null;
          }
          m.$2(this.$1w);
          this.$1q.get_router().unregisterHandler(this);
          this.$1g();
        },
        $h: function () {
          this.$1l.style.display = 'block';
          this.$1l.style.visibility = 'visible';
        },
        $5: function () {
          this.$1l.style.display = 'none';
        },
        $6: function () {
          this.$1l.style.visibility = 'hidden';
        },
        $i: function () {
          this.$12('showDownloadDialog');
        },
        $m: function () {
          this.$12('showExportImageDialog');
        },
        $l: function (e) {
          var bo = this.$1i(e);
          this.$12('showExportDataDialog', bo);
        },
        $k: function (e) {
          var bo = this.$1i(e);
          this.$12('showExportCrosstabDialog', bo);
        },
        $n: function () {
          this.$12('showExportPDFDialog');
        },
        $o: function () {
          this.$12('showExportPowerPointDialog');
        },
        $4: function (e) {
          var bo = this.$1i(e);
          this.$12('exportCrosstabToExcel', bo);
        },
        $d: function () {
          return tab._Utility.noResultPromiseHelper(
            'api.RevertAllCommand',
            null,
            this.$1q
          );
        },
        $a: function () {
          return tab._Utility.noResultPromiseHelper(
            'api.RefreshDataCommand',
            null,
            this.$1q
          );
        },
        $p: function () {
          this.$12('showShareDialog');
        },
        $j: function () {
          if (this.get__workbookImpl().get_isDownloadAllowed()) {
            this.$12('showDownloadWorkbookDialog');
          } else {
            throw tab._TableauException.create(
              'downloadWorkbookNotAllowed',
              'Download workbook is not allowed'
            );
          }
        },
        $7: function () {
          return this.$11('pauseAutomaticUpdates');
        },
        $c: function () {
          return this.$11('resumeAutomaticUpdates');
        },
        $q: function () {
          return this.$11('toggleAutomaticUpdates');
        },
        $g: function (e, bo) {
          this.$1f(tab.Size.$ctor(-1, -1));
          this.$1h(e, bo);
          if (ss.isValue(this.$1z)) {
            this.$1z._updateActiveSheetAsync();
          }
        },
        $f: function (e) {
          this.$1j = e;
        },
        $0: function () {
          return this.$1u.parentElement;
        },
        $1: function () {
          try {
            m.$0(this.$1w);
          } catch (bo) {
            var e = ss.Exception.wrap(bo);
            this.$2();
            throw e;
          }
          if (!this.$1u.fixedSize) {
            this.$1m = tab._Utility.computeContentSize(this.$w());
            if (this.$1m.width === 0 || this.$1m.height === 0) {
              this.$1m = tab.Size.$ctor(800, 600);
            }
            this.$1l = this.$F();
            this.$6();
            if (this.$1u.displayStaticImage) {
              this.$1v = this.$G(this.$1m.width + 'px', this.$1m.height + 'px');
              this.$1v.style.display = 'block';
            }
          } else {
            if (this.$1u.displayStaticImage) {
              this.$1v = this.$G(this.$1u.width, this.$1u.height);
              this.$1v.style.display = 'block';
            }
            this.$1l = this.$F();
            this.$h();
          }
          if (!tab._Utility.hasWindowPostMessage()) {
            if (tab._Utility.isIE()) {
              this.$1l['onreadystatechange'] = this.$K();
            } else {
              this.$1l.onload = this.$K();
            }
          }
          this.$1p = !this.$1u.toolbar;
          this.$1k = !this.$1u.tabs;
          this.$1q.get_router().registerHandler(this);
          this.$1l.src = this.$1u.get_url();
        },
        $e: function () {
          try {
            if (
              !tab._Utility.hasWindowPostMessage() ||
              ss.isNullOrUndefined(this.$1l) ||
              !ss.isValue(this.$1l.contentWindow)
            ) {
              return;
            }
          } catch (bq) {
            return;
          }
          var e = tab._Utility.visibleContentRectInDocumentCoordinates(
            this.get_iframe()
          );
          var bo = tab._Utility.contentRectInDocumentCoordinates(
            this.get_iframe()
          );
          var bp = new tab.NonApiCommand('layoutInfoResp', [
            (e.left - bo.left).toString(),
            (e.top - bo.top).toString(),
            e.width.toString(),
            e.height.toString(),
          ]);
          this.$1l.contentWindow.postMessage(bp.serialize(), '*');
        },
        $3: function () {
          if (
            !tab._Utility.hasWindowPostMessage() ||
            ss.isNullOrUndefined(this.$1l) ||
            !ss.isValue(this.$1l.contentWindow)
          ) {
            return;
          }
          var e = new tab.NonApiCommand(
            'tableau.enableVisibleRectCommunication',
            []
          );
          this.$1l.contentWindow.postMessage(e.serialize(), '*');
        },
        $9: function () {
          return tab._Utility.noResultPromiseHelper('api.Redo', null, this.$1q);
        },
        $r: function () {
          return tab._Utility.noResultPromiseHelper('api.Undo', null, this.$1q);
        },
        sendScaleFactor: function (e) {
          var bo = document.documentElement.clientWidth / window.innerWidth;
          var bp = 0;
          var bq = 0;
          var br = new tab.NonApiCommand('sf', [
            e,
            bo.toString(),
            bp.toString(),
            bq.toString(),
          ]);
          if (ss.isValue(this.$1l) && ss.isValue(this.$1l.contentWindow)) {
            this.$1l.contentWindow.postMessage(br.serialize(), '*');
          }
        },
        _sendCommand: function (e) {
          return function (bo, bp) {
            this.$1q.sendCommand(e).call(this.$1q, bo, bp);
          };
        },
        $8: function (e) {
          if (!ss.staticEquals(this.$1$6, null)) {
            this.$1$6(new H('parametervaluechange', this.$1w, e));
          }
        },
        $17: function (e) {
          this.get__workbookImpl()._update(
            ss.mkdel(this, function () {
              if (!ss.staticEquals(this.$1$7, null)) {
                this.$1$7(
                  new y(
                    'customviewload',
                    this.$1w,
                    ss.isValue(e) ? e._impl : null
                  )
                );
              }
            })
          );
        },
        $19: function (e) {
          this.get__workbookImpl()._update(
            ss.mkdel(this, function () {
              if (!ss.staticEquals(this.$1$8, null)) {
                this.$1$8(new y('customviewsave', this.$1w, e._impl));
              }
            })
          );
        },
        $18: function (e) {
          if (!ss.staticEquals(this.$1$9, null)) {
            this.$1$9(new y('customviewremove', this.$1w, e._impl));
          }
        },
        $1a: function (e) {
          if (!ss.staticEquals(this.$1$10, null)) {
            this.$1$10(new y('customviewsetdefault', this.$1w, e._impl));
          }
        },
        $1d: function (e, bo) {
          if (!ss.staticEquals(this.$1$11, null)) {
            this.$1$11(new L('tabswitch', this.$1w, e, bo));
          }
        },
        raiseStoryPointSwitch: function (e, bo) {
          if (!ss.staticEquals(this.$1$13, null)) {
            this.$1$13(new J('storypointswitch', this.$1w, e, bo));
          }
        },
        $1c: function () {
          if (!ss.staticEquals(this.$1$2, null)) {
            this.$1$2(this);
          }
        },
        $1b: function () {
          if (!ss.staticEquals(this.$1$1, null)) {
            this.$1$1(this);
          }
        },
        $1f: function (e) {
          if (!ss.staticEquals(this.$1$14, null)) {
            this.$1$14(new P('vizresize', this.$1w, e));
          }
        },
        $16: function (e) {
          if (!ss.staticEquals(this.$1$16, null)) {
            var bo = null;
            var bp = this.$1z.get_activeSheetImpl();
            if (bp.get_isStory()) {
              bp = bp.get_activeStoryPointImpl().get_containedSheetImpl();
            }
            if (ss.referenceEquals(bp.get_name(), e.get_worksheetName())) {
              bo = bp;
            } else if (bp.get_isDashboard()) {
              var bq = bp;
              bo = bq.get_worksheets()._get(e.get_worksheetName())._impl;
            }
            if (ss.isValue(bo)) {
              bo.set_selectedMarks(null);
              this.$1$16(
                new x(
                  'custommarkcontextmenu',
                  this.$1w,
                  e.get_data().toString(),
                  bo
                )
              );
            }
          }
        },
        $1e: function (e, bo) {
          if (!ss.staticEquals(this.$1$15, null)) {
            this.$1$15(new N('urlaction', this.$1w, e, bo));
          }
        },
        $1h: function (e, bo) {
          this.$1u.width = e;
          this.$1u.height = bo;
          this.$1l.style.width = this.$1u.width;
          this.$1l.style.height = this.$1u.height;
        },
        $1i: function (e) {
          if (ss.isNullOrUndefined(e)) {
            return null;
          }
          var bo = this.$1z.$3(e);
          if (ss.isNullOrUndefined(bo)) {
            throw tab._TableauException.createNotActiveSheet();
          }
          return bo.get_name();
        },
        $11: function (e) {
          if (
            e !== 'pauseAutomaticUpdates' &&
            e !== 'resumeAutomaticUpdates' &&
            e !== 'toggleAutomaticUpdates'
          ) {
            throw tab._TableauException.createInternalError(null);
          }
          var bo = {};
          bo['api.invokeCommandName'] = e;
          var bp = new tab._Deferred();
          var bq = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object,
          ]))(
            'api.InvokeCommandCommand',
            0,
            ss.mkdel(this, function (br) {
              if (ss.isValue(br) && ss.isValue(br.isAutoUpdate)) {
                this.$1j = !br.isAutoUpdate;
              }
              bp.resolve(this.$1j);
            }),
            function (br, bs) {
              bp.reject(tab._TableauException.createServerError(bs));
            }
          );
          this._sendCommand(Object).call(this, bo, bq);
          return bp.get_promise();
        },
        $12: function (e, bo) {
          if (
            e !== 'showDownloadDialog' &&
            e !== 'showExportImageDialog' &&
            e !== 'showExportDataDialog' &&
            e !== 'showExportCrosstabDialog' &&
            e !== 'showExportPDFDialog' &&
            e !== 'showShareDialog' &&
            e !== 'showExportPowerPointDialog' &&
            e !== 'exportCrosstabToExcel' &&
            e !== 'showDownloadWorkbookDialog'
          ) {
            throw tab._TableauException.createInternalError(null);
          }
          var bp = {};
          bp['api.invokeCommandName'] = e;
          if (ss.isValue(bo)) {
            bp['api.invokeCommandParam'] = bo;
          }
          var bq = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object,
          ]))('api.InvokeCommandCommand', 0, null, null);
          this._sendCommand(Object).call(this, bp, bq);
        },
        $R: function (e) {
          var bo = JSON.parse(e.get_data());
          this.$S(bo);
        },
        $10: function (e) {
          if (
            ss.isValue(this.$1z) &&
            ss.referenceEquals(this.$1z.get_name(), e.get_workbookName())
          ) {
            this.$15(null);
          } else {
            this.$1c();
          }
        },
        $U: function (e) {
          if (
            ss.staticEquals(this.$1$3, null) ||
            !ss.referenceEquals(this.$1z.get_name(), e.get_workbookName())
          ) {
            return;
          }
          var bo = null;
          var bp = this.$1z.get_activeSheetImpl();
          if (bp.get_isStory()) {
            bp = bp.get_activeStoryPointImpl().get_containedSheetImpl();
          }
          if (ss.referenceEquals(bp.get_name(), e.get_worksheetName())) {
            bo = bp;
          } else if (bp.get_isDashboard()) {
            var bq = bp;
            bo = bq.get_worksheets()._get(e.get_worksheetName())._impl;
          }
          if (ss.isValue(bo)) {
            bo.set_selectedMarks(null);
            this.$1$3(new G('marksselection', this.$1w, bo));
          }
        },
        $T: function (e) {
          if (
            ss.staticEquals(this.$1$4, null) ||
            !ss.referenceEquals(this.$1z.get_name(), e.get_workbookName())
          ) {
            return;
          }
          var bo = null;
          var bp = this.$1z.get_activeSheetImpl();
          if (bp.get_isStory()) {
            bp = bp.get_activeStoryPointImpl().get_containedSheetImpl();
          }
          if (ss.referenceEquals(bp.get_name(), e.get_worksheetName())) {
            bo = bp;
          } else if (bp.get_isDashboard()) {
            var bq = bp;
            bo = bq.get_worksheets()._get(e.get_worksheetName())._impl;
          }
          if (ss.isValue(bo)) {
            bo.highlightedMarks = null;
            this.$1$4(new C('markshighlight', this.$1w, bo));
          }
        },
        $Q: function (e) {
          if (
            ss.staticEquals(this.$1$5, null) ||
            !ss.referenceEquals(this.$1z.get_name(), e.get_workbookName())
          ) {
            return;
          }
          var bo = null;
          var bp = this.$1z.get_activeSheetImpl();
          if (ss.referenceEquals(bp.get_name(), e.get_worksheetName())) {
            bo = bp;
          } else if (bp.get_isDashboard()) {
            var bq = bp;
            bo = bq.get_worksheets()._get(e.get_worksheetName())._impl;
          } else if (bp.get_isStory()) {
            var br = bp;
            var bs = br.get_activeStoryPointImpl();
            var bt = bs.get_containedSheetImpl();
            if (bt.get_isDashboard()) {
              var bu = bt;
              bo = bu.get_worksheets()._get(e.get_worksheetName())._impl;
            } else if (
              ss.referenceEquals(bt.get_name(), e.get_worksheetName())
            ) {
              bo = bt;
            }
          }
          if (ss.isValue(bo)) {
            var bv = JSON.parse(e.get_data());
            var bw = bv[0];
            var bx = bv[1];
            this.$1$5(new A('filterchange', this.$1w, bo, bw, bx));
          }
        },
        $V: function (e) {
          if (!ss.staticEquals(this.$1$6, null)) {
            if (ss.referenceEquals(this.$1z.get_name(), e.get_workbookName())) {
              this.$1z.$g(null);
              var bo = e.get_data();
              this.$8(bo);
            }
          }
        },
        $P: function (e) {
          var bo = JSON.parse(e.get_data());
          var bp = ss.mkdel(this, function () {
            c._processCustomViews(this.$1z, this.$1q, bo);
          });
          var bq = ss.mkdel(this, function () {
            this.$1b();
            if (!ss.staticEquals(this.$1$7, null) && !bo.customViewLoaded) {
              this.$17(this.$1z.get_activeCustomView());
            }
          });
          if (ss.isNullOrUndefined(this.$1z)) {
            this.$1n = true;
            this.$1z = new o(
              this,
              this.$1q,
              ss.mkdel(this, function () {
                bp();
                this.$15(bq);
                this.$1n = false;
              })
            );
          } else {
            bp();
            this.$H(bq);
          }
        },
        $O: function (e) {
          var bo = JSON.parse(e.get_data());
          if (ss.isNullOrUndefined(this.$1z)) {
            this.$1z = new o(this, this.$1q, null);
          }
          if (ss.isValue(this.$1z)) {
            c._processCustomViewUpdate(this.$1z, this.$1q, bo, true);
          }
          if (!ss.staticEquals(this.$1$8, null)) {
            var bp = this.$1z.$k()._toApiCollection();
            for (var bq = 0, br = bp.length; bq < br; bq++) {
              this.$19(bp[bq]);
            }
          }
        },
        $M: function () {
          if (!ss.staticEquals(this.$1$9, null)) {
            var e = this.$1z.$i()._toApiCollection();
            for (var bo = 0, bp = e.length; bo < bp; bo++) {
              this.$18(e[bo]);
            }
          }
        },
        $N: function (e) {
          var bo = JSON.parse(e.get_data());
          if (ss.isValue(this.$1z)) {
            c._processCustomViews(this.$1z, this.$1q, bo);
          }
          if (
            !ss.staticEquals(this.$1$10, null) &&
            ss.isValue(bo.defaultCustomViewId)
          ) {
            var bp = this.$1z.$d();
            for (var bq = 0; bq < bp.get__length(); bq++) {
              var br = bp.get_item(bq);
              if (br.getDefault()) {
                this.$1a(br);
                break;
              }
            }
          }
        },
        $X: function (e) {
          this.$1z._update(
            ss.mkdel(this, function () {
              if (ss.isValue(this.$B)) {
                this.$B();
              }
              if (
                ss.referenceEquals(this.$1z.get_name(), e.get_workbookName())
              ) {
                var bo = e.get_worksheetName();
                var bp = e.get_data();
                this.$1d(bo, bp);
              }
              this.$15(null);
            })
          );
        },
        $Y: function (e) {
          var bo = JSON.parse(e.get_data());
          var bp = new l(this, bo);
          if (!ss.staticEquals(this.$1$12, null)) {
            this.$1$12(new M('toolbarstatechange', this.$1w, bp));
          }
        },
        $W: function (e) {
          var bo = this.$1z.get_activeSheetImpl();
          if (bo.get_sheetType() === 'story') {
            bo.update(JSON.parse(e.get_data()));
          }
        },
        $Z: function (e) {
          if (!ss.staticEquals(this.$1$15, null)) {
            var bo = JSON.parse(e.get_data());
            this.$1e(bo.url, bo.target);
          }
        },
        $L: function (e) {
          this.$16(e);
        },
        $15: function (e) {
          if (!this.$1r) {
            var bo = this.$1s;
            window.setTimeout(
              ss.mkdel(this, function () {
                if (this.$1r) {
                  return;
                }
                if (!ss.staticEquals(bo, null)) {
                  bo(new K('firstinteractive', this.$1w));
                }
                if (!ss.staticEquals(e, null)) {
                  e();
                }
                this.$1r = true;
              }),
              0
            );
          }
          this.$1c();
        },
        $H: function (e) {
          var bo = new Date();
          var bp = null;
          bp = ss.mkdel(this, function () {
            var bq = new Date();
            if (this.$1r) {
              e();
            } else if (bq - bo > 5 * 60 * 1000) {
              throw tab._TableauException.createInternalError(
                'Timed out while waiting for the viz to become interactive'
              );
            } else {
              window.setTimeout(bp, 10);
            }
          });
          bp();
        },
        $E: function () {
          if (tab._Utility.isIE()) {
            if (this.$1l['readyState'] === 'complete') {
              this.handleVizLoad();
            }
          } else {
            this.handleVizLoad();
          }
        },
        $13: function () {
          window.setTimeout(ss.mkdel(this, this.$E), 3000);
        },
        $G: function (e, bo) {
          var bp = document.createElement('div');
          bp.style.background =
            "transparent url('" +
            this.$1u.staticImageUrl +
            "') no-repeat scroll 0 0";
          bp.style.left = '8px';
          bp.style.top = this.$1u.tabs ? '31px' : '9px';
          bp.style.position = 'absolute';
          bp.style.width = e;
          bp.style.height = bo;
          this.$0().appendChild(bp);
          return bp;
        },
        $F: function () {
          if (ss.isNullOrUndefined(this.$0())) {
            return null;
          }
          var e = document.createElement('IFrame');
          e.frameBorder = '0';
          e.setAttribute('allowTransparency', 'true');
          e.setAttribute('allowFullScreen', 'true');
          e.setAttribute('title', this.$I());
          e.marginHeight = '0';
          e.marginWidth = '0';
          e.style.display = 'block';
          if (this.$1u.fixedSize) {
            e.style.width = this.$1u.width;
            e.style.height = this.$1u.height;
            e.setAttribute('scrolling', 'no');
          } else {
            e.style.width = '1px';
            e.style.height = '1px';
            e.setAttribute('scrolling', 'no');
          }
          if (tab._Utility.isSafari()) {
            e.addEventListener('mousewheel', ss.mkdel(this, this.$14), false);
          }
          this.$0().appendChild(e);
          return e;
        },
        $I: function () {
          var e;
          if (ss.isValue(window.navigator.language)) {
            e = window.navigator.language;
          } else if (ss.isValue(window.navigator['userLanguage'])) {
            e = window.navigator['userLanguage'];
          } else if (ss.isValue(window.navigator['browserLanguage'])) {
            e = window.navigator['browserLanguage'];
          } else {
            e = 'en-US';
          }
          switch (e) {
            case 'zh-CN': {
              return '数据可视化';
            }
            case 'zh-TW': {
              return '資料可視化';
            }
            case 'en-GB': {
              return 'Data Visualisation';
            }
            case 'fr-CA': {
              return 'Visualisation de données';
            }
          }
          switch (e.substr(0, 2)) {
            case 'fr': {
              return 'Visualisation de données';
            }
            case 'es': {
              return 'Visualización de datos';
            }
            case 'it': {
              return 'Visualizzazione dati';
            }
            case 'pt': {
              return 'Visualização de dados';
            }
            case 'ja': {
              return 'データ ビジュアライゼーション';
            }
            case 'de': {
              return 'Datenvisualisierung';
            }
            case 'sv': {
              return 'Datavisualisering';
            }
            case 'th': {
              return 'การแสดงข้อมูลเป็นภาพ';
            }
            case 'ko': {
              return '데이터 비주얼리제이션';
            }
            case 'en':
            default: {
              return 'Data Visualization';
            }
          }
        },
        $14: function (e) {},
        $K: function () {
          return ss.mkdel(this, function (e) {
            this.$13();
          });
        },
        $S: function (e) {
          var bo = tab.SheetSizeFactory.fromSizeConstraints(e.sizeConstraints);
          this.$1x = Q.$ctor(bo, e.chromeHeight);
          if (ss.isValue(this.$1t)) {
            this.$1t(new B('firstvizsizeknown', this.$1w, this.$1x));
          }
          if (this.$1u.fixedSize) {
            return;
          }
          this.$b();
          this.$C();
          this.$h();
        },
        $1g: function () {
          if (ss.isNullOrUndefined(this.$1y)) {
            return;
          }
          if (tab._Utility.hasWindowAddEventListener()) {
            window.removeEventListener('resize', this.$1y, false);
          } else {
            window.self.detachEvent('onresize', this.$1y);
          }
          this.$1y = null;
        },
        $C: function () {
          if (ss.isValue(this.$1y)) {
            return;
          }
          this.$1y = ss.mkdel(this, function () {
            this.$b();
          });
          if (tab._Utility.hasWindowAddEventListener()) {
            window.addEventListener('resize', this.$1y, false);
          } else {
            window.self.attachEvent('onresize', this.$1y);
          }
        },
      }
    ));
    var P = (global.tab.VizResizeEvent = ss.mkType(
      a,
      'tab.VizResizeEvent',
      function (e, bo, bp) {
        this.$2 = null;
        K.call(this, e, bo);
        this.$2 = bp;
      },
      {
        getAvailableSize: function () {
          return this.$2;
        },
      }
    ));
    var Q = (global.tab.VizSize = ss.mkType(a, 'tab.VizSize', null, null, {
      $ctor: function (e, bo) {
        var bp = new Object();
        bp.sheetSize = null;
        bp.chromeHeight = 0;
        bp.sheetSize = e;
        bp.chromeHeight = bo;
        return bp;
      },
      isInstanceOfType: function () {
        return true;
      },
    }));
    var R = (global.tab.WorksheetEvent = ss.mkType(
      a,
      'tab.WorksheetEvent',
      function (e, bo, bp) {
        this.$2 = null;
        K.call(this, e, bo);
        this.$2 = bp;
      },
      {
        getWorksheet: function () {
          return this.$2.get_worksheet();
        },
      }
    ));
    var S = (global.tableauSoftware.CategoricalFilter = ss.mkType(
      a,
      'tableauSoftware.CategoricalFilter',
      function (e, bo) {
        this.$c = false;
        this.$b = false;
        this.$a = null;
        Y.call(this, e, bo);
        this.$9(bo);
      },
      {
        getIsExcludeMode: function () {
          return this.$c;
        },
        getIsAllSelected: function () {
          return this.$b;
        },
        getAppliedValues: function () {
          return this.$a;
        },
        _updateFromJson: function (e) {
          this.$9(e);
        },
        $9: function (e) {
          this.$c = e.isExclude;
          this.$b = e.isAllSelected;
          if (ss.isValue(e.appliedValues)) {
            this.$a = [];
            for (var bo = 0; bo < e.appliedValues.length; bo++) {
              var bp = e.appliedValues[bo];
              this.$a.push(tab._Utility.getDataValue(bp));
            }
          }
        },
      }
    ));
    var T = (global.tableauSoftware.CustomView = ss.mkType(
      a,
      'tableauSoftware.CustomView',
      function (e) {
        this._impl = null;
        this._impl = e;
      },
      {
        getWorkbook: function () {
          return this._impl.$9();
        },
        getUrl: function () {
          return this._impl.$8();
        },
        getName: function () {
          return this._impl.$5();
        },
        setName: function (e) {
          this._impl.$6(e);
        },
        getOwnerName: function () {
          return this._impl.$7();
        },
        getAdvertised: function () {
          return this._impl.$1();
        },
        setAdvertised: function (e) {
          this._impl.$2(e);
        },
        getDefault: function () {
          return this._impl.$4();
        },
        saveAsync: function () {
          return this._impl.saveAsync();
        },
      }
    ));
    var U = (global.tableauSoftware.Dashboard = ss.mkType(
      a,
      'tableauSoftware.Dashboard',
      function (e) {
        this._impl = null;
        bd.call(this, e);
      },
      {
        getParentStoryPoint: function () {
          return this._impl.get_parentStoryPoint();
        },
        getObjects: function () {
          return this._impl.get_objects()._toApiCollection();
        },
        getWorksheets: function () {
          return this._impl.get_worksheets()._toApiCollection();
        },
        getFiltersAsync: function () {
          return this._impl.$e();
        },
        applyFilterAsync: function (e, bo, bp, bq) {
          return this._impl.$d(e, bo, bp, bq);
        },
      }
    ));
    var V = (global.tableauSoftware.DashboardObject = ss.mkType(
      a,
      'tableauSoftware.DashboardObject',
      function (e, bo, bp) {
        this.$2 = null;
        this.$0 = null;
        this.$1 = null;
        if (e.objectType === 'worksheet' && ss.isNullOrUndefined(bp)) {
          throw tab._TableauException.createInternalError(
            'worksheet parameter is required for WORKSHEET objects'
          );
        } else if (e.objectType !== 'worksheet' && ss.isValue(bp)) {
          throw tab._TableauException.createInternalError(
            'worksheet parameter should be undefined for non-WORKSHEET objects'
          );
        }
        this.$2 = e;
        this.$0 = bo;
        this.$1 = bp;
      },
      {
        getObjectType: function () {
          return this.$2.objectType;
        },
        getDashboard: function () {
          return this.$0;
        },
        getWorksheet: function () {
          return this.$1;
        },
        getPosition: function () {
          return this.$2.position;
        },
        getSize: function () {
          return this.$2.size;
        },
      }
    ));
    var W = (global.tableauSoftware.DataSource = ss.mkType(
      a,
      'tableauSoftware.DataSource',
      function (e) {
        this.$0 = null;
        this.$0 = e;
      },
      {
        getName: function () {
          return this.$0.get_name();
        },
        getFields: function () {
          return this.$0.get_fields()._toApiCollection();
        },
        getIsPrimary: function () {
          return this.$0.get_isPrimary();
        },
      }
    ));
    var X = (global.tableauSoftware.Field = ss.mkType(
      a,
      'tableauSoftware.Field',
      function (e, bo, bp, bq) {
        this.$0 = null;
        this.$3 = null;
        this.$2 = null;
        this.$1 = null;
        this.$0 = e;
        this.$3 = bo;
        this.$2 = bp;
        this.$1 = bq;
      },
      {
        getDataSource: function () {
          return this.$0;
        },
        getName: function () {
          return this.$3;
        },
        getRole: function () {
          return this.$2;
        },
        getAggregation: function () {
          return this.$1;
        },
      }
    ));
    var Y = (global.tableauSoftware.Filter = ss.mkType(
      a,
      'tableauSoftware.Filter',
      function (e, bo) {
        this.$8 = null;
        this.$7 = null;
        this.$4 = null;
        this.$5 = null;
        this.$2 = null;
        this.$1 = null;
        this.$6 = null;
        this.$3 = null;
        this.$8 = e;
        this.$0(bo);
      },
      {
        getFilterType: function () {
          return this.$7;
        },
        getFieldName: function () {
          return this.$4;
        },
        getWorksheet: function () {
          return this.$8.get_worksheet();
        },
        getFieldAsync: function () {
          var e = new tab._Deferred();
          if (ss.isNullOrUndefined(this.$2)) {
            var bo = function (bq) {
              e.reject(bq);
              return null;
            };
            var bp = ss.mkdel(this, function (bq) {
              this.$2 = new X(bq, this.$4, this.$6, this.$3);
              e.resolve(this.$2);
              return null;
            });
            this.$8.$m(this.$1).then(bp, bo);
          } else {
            window.setTimeout(
              ss.mkdel(this, function () {
                e.resolve(this.$2);
              }),
              0
            );
          }
          return e.get_promise();
        },
        getAppliedWorksheetsAsync: function () {
          return this.$8.$l(this.getWorksheet().getName(), this.$5);
        },
        setAppliedWorksheetsAsync: function (e) {
          return this.$8.$A(e, this.getWorksheet().getName(), this.$5, this.$4);
        },
        _update: function (e) {
          this.$0(e);
          this._updateFromJson(e);
        },
        _addFieldParams: function (e) {},
        _updateFromJson: null,
        $0: function (e) {
          this.$5 = e.fieldName;
          this.$4 = e.caption;
          this.$7 = tab.ApiEnumConverter.convertFilterType(e.filterType);
          this.$2 = null;
          this.$1 = e.dataSourceName;
          this.$6 = tab.ApiEnumConverter.convertFieldRole(
            ss.coalesce(e.fieldRole, 'unknown')
          );
          this.$3 = tab.ApiEnumConverter.convertFieldAggregation(
            ss.coalesce(e.fieldAggregation, 'NONE')
          );
        },
      },
      {
        $0: function (e, bo) {
          switch (bo.filterType) {
            case 'categorical': {
              return new S(e, bo);
            }
            case 'relativedate': {
              return new bc(e, bo);
            }
            case 'hierarchical': {
              return new Z(e, bo);
            }
            case 'quantitative': {
              return new bb(e, bo);
            }
          }
          return null;
        },
        processFiltersList: function (e, bo) {
          var bp = new tab._Collection();
          for (var bq = 0; bq < bo.filters.length; bq++) {
            var br = bo.filters[bq];
            if (!bp._has(br.caption)) {
              bp._add(br.caption, br.caption);
            }
          }
          var bs = new tab._Collection();
          for (var bt = 0; bt < bo.filters.length; bt++) {
            var bu = bo.filters[bt];
            var bv = Y.$0(e, bu);
            if (!bs._has(bu.caption)) {
              bs._add(bu.caption, bv);
              continue;
            }
            var bw = bu.caption.toString() + '_' + bu.filterType.toString();
            var bx = bw;
            var by = 1;
            while (bp._has(bx)) {
              bx = bw + '_' + by;
              by++;
            }
            bs._add(bx, bv);
          }
          return bs;
        },
      }
    ));
    var Z = (global.tableauSoftware.HierarchicalFilter = ss.mkType(
      a,
      'tableauSoftware.HierarchicalFilter',
      function (e, bo) {
        this.$a = 0;
        Y.call(this, e, bo);
        this.$9(bo);
      },
      {
        _addFieldParams: function (e) {
          e['api.filterHierarchicalLevels'] = this.$a;
        },
        _updateFromJson: function (e) {
          this.$9(e);
        },
        $9: function (e) {
          this.$a = e.levels;
        },
      }
    ));
    var ba = (global.tableauSoftware.Parameter = ss.mkType(
      a,
      'tableauSoftware.Parameter',
      function (e) {
        this._impl = null;
        this._impl = e;
      },
      {
        getName: function () {
          return this._impl.$7();
        },
        getCurrentValue: function () {
          return this._impl.$2();
        },
        getDataType: function () {
          return this._impl.$3();
        },
        getAllowableValuesType: function () {
          return this._impl.$1();
        },
        getAllowableValues: function () {
          return this._impl.$0();
        },
        getMinValue: function () {
          return this._impl.$6();
        },
        getMaxValue: function () {
          return this._impl.$5();
        },
        getStepSize: function () {
          return this._impl.$9();
        },
        getDateStepPeriod: function () {
          return this._impl.$4();
        },
      }
    ));
    var bb = (global.tableauSoftware.QuantitativeFilter = ss.mkType(
      a,
      'tableauSoftware.QuantitativeFilter',
      function (e, bo) {
        this.$b = null;
        this.$a = null;
        this.$e = null;
        this.$d = null;
        this.$c = false;
        Y.call(this, e, bo);
        this.$9(bo);
      },
      {
        getMin: function () {
          return this.$e;
        },
        getMax: function () {
          return this.$d;
        },
        getIncludeNullValues: function () {
          return this.$c;
        },
        getDomainMin: function () {
          return this.$b;
        },
        getDomainMax: function () {
          return this.$a;
        },
        _updateFromJson: function (e) {
          this.$9(e);
        },
        $9: function (e) {
          this.$b = tab._Utility.getDataValue(e.domainMinValue);
          this.$a = tab._Utility.getDataValue(e.domainMaxValue);
          this.$e = tab._Utility.getDataValue(e.minValue);
          this.$d = tab._Utility.getDataValue(e.maxValue);
          this.$c = e.includeNullValues;
        },
      }
    ));
    var bc = (global.tableauSoftware.RelativeDateFilter = ss.mkType(
      a,
      'tableauSoftware.RelativeDateFilter',
      function (e, bo) {
        this.$a = null;
        this.$c = null;
        this.$b = 0;
        Y.call(this, e, bo);
        this.$9(bo);
      },
      {
        getPeriod: function () {
          return this.$a;
        },
        getRange: function () {
          return this.$c;
        },
        getRangeN: function () {
          return this.$b;
        },
        _updateFromJson: function (e) {
          this.$9(e);
        },
        $9: function (e) {
          if (ss.isValue(e.periodType)) {
            this.$a = tab.ApiEnumConverter.convertPeriodType(
              ss.unbox(e.periodType)
            );
          }
          if (ss.isValue(e.rangeType)) {
            this.$c = tab.ApiEnumConverter.convertDateRange(
              ss.unbox(e.rangeType)
            );
          }
          if (ss.isValue(e.rangeN)) {
            this.$b = ss.unbox(e.rangeN);
          }
        },
      }
    ));
    var bd = (global.tableauSoftware.Sheet = ss.mkType(
      a,
      'tableauSoftware.Sheet',
      function (e) {
        this._impl = null;
        tab._Param.verifyValue(e, 'sheetImpl');
        this._impl = e;
      },
      {
        getName: function () {
          return this._impl.get_name();
        },
        getIndex: function () {
          return this._impl.get_index();
        },
        getWorkbook: function () {
          return this._impl.get_workbookImpl().get_workbook();
        },
        getSize: function () {
          return this._impl.get_size();
        },
        getIsHidden: function () {
          return this._impl.get_isHidden();
        },
        getIsActive: function () {
          return this._impl.get_isActive();
        },
        getSheetType: function () {
          return this._impl.get_sheetType();
        },
        getUrl: function () {
          return this._impl.get_url();
        },
        changeSizeAsync: function (e) {
          return this._impl.changeSizeAsync(e);
        },
      }
    ));
    var be = (global.tableauSoftware.SheetInfo = ss.mkType(
      a,
      'tableauSoftware.SheetInfo',
      function (e) {
        this.$0 = null;
        this.$0 = e;
      },
      {
        getName: function () {
          return this.$0.name;
        },
        getSheetType: function () {
          return this.$0.sheetType;
        },
        getSize: function () {
          return this.$0.size;
        },
        getIndex: function () {
          return this.$0.index;
        },
        getUrl: function () {
          return this.$0.url;
        },
        getIsActive: function () {
          return this.$0.isActive;
        },
        getIsHidden: function () {
          return this.$0.isHidden;
        },
        getWorkbook: function () {
          return this.$0.workbook;
        },
      }
    ));
    var bf = (global.tableauSoftware.Story = ss.mkType(
      a,
      'tableauSoftware.Story',
      function (e) {
        this._impl = null;
        bd.call(this, e);
      },
      {
        getActiveStoryPoint: function () {
          return this._impl.get_activeStoryPointImpl().get_storyPoint();
        },
        getStoryPointsInfo: function () {
          return this._impl.get_storyPointsInfo();
        },
        activatePreviousStoryPointAsync: function () {
          return this._impl.activatePreviousStoryPointAsync();
        },
        activateNextStoryPointAsync: function () {
          return this._impl.activateNextStoryPointAsync();
        },
        activateStoryPointAsync: function (e) {
          return this._impl.activateStoryPointAsync(e);
        },
        revertStoryPointAsync: function (e) {
          return this._impl.revertStoryPointAsync(e);
        },
      }
    ));
    var bg = (global.tableauSoftware.StoryPoint = ss.mkType(
      a,
      'tableauSoftware.StoryPoint',
      function (e) {
        this.$0 = null;
        this.$0 = e;
      },
      {
        getCaption: function () {
          return this.$0.get_caption();
        },
        getContainedSheet: function () {
          return ss.isValue(this.$0.get_containedSheetImpl())
            ? this.$0.get_containedSheetImpl().get_sheet()
            : null;
        },
        getIndex: function () {
          return this.$0.get_index();
        },
        getIsActive: function () {
          return this.$0.get_isActive();
        },
        getIsUpdated: function () {
          return this.$0.get_isUpdated();
        },
        getParentStory: function () {
          return this.$0.get_parentStoryImpl().get_story();
        },
      }
    ));
    var bh = (global.tableauSoftware.StoryPointInfo = ss.mkType(
      a,
      'tableauSoftware.StoryPointInfo',
      function (e) {
        this._impl = null;
        this._impl = e;
      },
      {
        getCaption: function () {
          return this._impl.caption;
        },
        getIndex: function () {
          return this._impl.index;
        },
        getIsActive: function () {
          return this._impl.isActive;
        },
        getIsUpdated: function () {
          return this._impl.isUpdated;
        },
        getParentStory: function () {
          return this._impl.parentStoryImpl.get_story();
        },
      }
    ));
    var bi = (global.tableauSoftware.ToolbarState = ss.mkType(
      a,
      'tableauSoftware.ToolbarState',
      function (e) {
        this._impl = null;
        this._impl = e;
      },
      {
        getViz: function () {
          return this._impl.get_viz();
        },
        isButtonEnabled: function (e) {
          return this._impl.isButtonEnabled(e);
        },
      }
    ));
    var bj = (global.tableauSoftware.Version = ss.mkType(
      a,
      'tableauSoftware.Version',
      function (e, bo, bp, bq) {
        this.$0 = 0;
        this.$2 = 0;
        this.$3 = 0;
        this.$1 = null;
        this.$0 = e;
        this.$2 = bo;
        this.$3 = bp;
        this.$1 = ss.coalesce(bq, null);
      },
      {
        getMajor: function () {
          return this.$0;
        },
        getMinor: function () {
          return this.$2;
        },
        getPatch: function () {
          return this.$3;
        },
        getMetadata: function () {
          return this.$1;
        },
        toString: function () {
          var e = this.$0 + '.' + this.$2 + '.' + this.$3;
          if (ss.isValue(this.$1) && this.$1.length > 0) {
            e += '-' + this.$1;
          }
          return e;
        },
      },
      {
        getCurrent: function () {
          return bj.$1;
        },
      }
    ));
    var bk = (global.tableauSoftware.Viz = ss.mkType(
      a,
      'tableauSoftware.Viz',
      function (e, bo, bp) {
        this._impl = null;
        var bq = tab._ApiObjectRegistry.getApiMessageRouter();
        this._impl = new O(bq, this, e, bo, bp);
        this._impl.$1();
      },
      {
        getAreTabsHidden: function () {
          return this._impl.$t();
        },
        getIsToolbarHidden: function () {
          return this._impl.$v();
        },
        getIsHidden: function () {
          return this._impl.$u();
        },
        getInstanceId: function () {
          return this._impl.get_instanceId();
        },
        getParentElement: function () {
          return this._impl.$w();
        },
        getUrl: function () {
          return this._impl.$x();
        },
        getVizSize: function () {
          return this._impl.$z();
        },
        getWorkbook: function () {
          return this._impl.$A();
        },
        getAreAutomaticUpdatesPaused: function () {
          return this._impl.$s();
        },
        getCurrentUrlAsync: function () {
          return this._impl.getCurrentUrlAsync();
        },
        addEventListener: function (e, bo) {
          this._impl.addEventListener(e, bo);
        },
        removeEventListener: function (e, bo) {
          this._impl.removeEventListener(e, bo);
        },
        dispose: function () {
          this._impl.$2();
        },
        show: function () {
          this._impl.$h();
        },
        hide: function () {
          this._impl.$5();
        },
        showExportDataDialog: function (e) {
          this._impl.$l(e);
        },
        showDownloadDialog: function () {
          this._impl.$i();
        },
        showExportCrossTabDialog: function (e) {
          this._impl.$k(e);
        },
        showExportImageDialog: function () {
          this._impl.$m();
        },
        showExportPDFDialog: function () {
          this._impl.$n();
        },
        showExportPowerPointDialog: function () {
          this._impl.$o();
        },
        exportCrossTabToExcel: function (e) {
          this._impl.$4(e);
        },
        revertAllAsync: function () {
          return this._impl.$d();
        },
        refreshDataAsync: function () {
          return this._impl.$a();
        },
        showShareDialog: function () {
          this._impl.$p();
        },
        showDownloadWorkbookDialog: function () {
          this._impl.$j();
        },
        pauseAutomaticUpdatesAsync: function () {
          return this._impl.$7();
        },
        resumeAutomaticUpdatesAsync: function () {
          return this._impl.$c();
        },
        toggleAutomaticUpdatesAsync: function () {
          return this._impl.$q();
        },
        refreshSize: function () {
          this._impl.$b();
        },
        setFrameSize: function (e, bo) {
          var bp = e;
          var bq = bo;
          if (tab._Utility.isNumber(e)) {
            bp = e.toString() + 'px';
          }
          if (tab._Utility.isNumber(bo)) {
            bq = bo.toString() + 'px';
          }
          this._impl.$g(bp, bq);
        },
        redoAsync: function () {
          return this._impl.$9();
        },
        undoAsync: function () {
          return this._impl.$r();
        },
      }
    ));
    var bl = (global.tableauSoftware.VizManager = ss.mkType(
      a,
      'tableauSoftware.VizManager',
      null,
      null,
      {
        getVizs: function () {
          return m.$3();
        },
      }
    ));
    var bm = (global.tableauSoftware.Workbook = ss.mkType(
      a,
      'tableauSoftware.Workbook',
      function (e) {
        this.$0 = null;
        this.$0 = e;
      },
      {
        getViz: function () {
          return this.$0.get_viz();
        },
        getPublishedSheetsInfo: function () {
          return this.$0.get_publishedSheets()._toApiCollection();
        },
        getName: function () {
          return this.$0.get_name();
        },
        getActiveSheet: function () {
          return this.$0.get_activeSheetImpl().get_sheet();
        },
        getActiveCustomView: function () {
          return this.$0.get_activeCustomView();
        },
        activateSheetAsync: function (e) {
          return this.$0._setActiveSheetAsync(e);
        },
        revertAllAsync: function () {
          return this.$0._revertAllAsync();
        },
        getCustomViewsAsync: function () {
          return this.$0.$4();
        },
        showCustomViewAsync: function (e) {
          return this.$0.$a(e);
        },
        removeCustomViewAsync: function (e) {
          return this.$0.$8(e);
        },
        rememberCustomViewAsync: function (e) {
          return this.$0.$7(e);
        },
        setActiveCustomViewAsDefaultAsync: function () {
          return this.$0.$9();
        },
        getParametersAsync: function () {
          return this.$0.$5();
        },
        changeParameterValueAsync: function (e, bo) {
          return this.$0.$2(e, bo);
        },
      }
    ));
    var bn = (global.tableauSoftware.Worksheet = ss.mkType(
      a,
      'tableauSoftware.Worksheet',
      function (e) {
        this._impl = null;
        bd.call(this, e);
      },
      {
        getParentDashboard: function () {
          return this._impl.get_parentDashboard();
        },
        getParentStoryPoint: function () {
          return this._impl.get_parentStoryPoint();
        },
        getDataSourcesAsync: function () {
          return this._impl.$n();
        },
        getFilterAsync: function (e, bo) {
          return this._impl.$o(null, e, bo);
        },
        getFiltersAsync: function (e) {
          return this._impl.$p(e);
        },
        applyFilterAsync: function (e, bo, bp, bq) {
          return this._impl.$d(e, bo, bp, bq);
        },
        clearFilterAsync: function (e) {
          return this._impl.$h(e);
        },
        applyRangeFilterAsync: function (e, bo) {
          return this._impl.$f(e, bo);
        },
        applyRelativeDateFilterAsync: function (e, bo) {
          return this._impl.$g(e, bo);
        },
        applyHierarchicalFilterAsync: function (e, bo, bp, bq) {
          return this._impl.$e(e, bo, bp, bq);
        },
        clearSelectedMarksAsync: function () {
          return this._impl.$j();
        },
        selectMarksAsync: function (e, bo, bp) {
          return this._impl.$z(e, bo, bp);
        },
        getSelectedMarksAsync: function () {
          return this._impl.$r();
        },
        getSummaryDataAsync: function (e) {
          return this._impl.$s(e);
        },
        getUnderlyingDataAsync: function (e) {
          console.warn(
            'Method getUnderlyingDataAsync is deprecated. Please use getUnderlyingTableDataAsync instead.'
          );
          return this._impl.$t(e);
        },
        getUnderlyingTablesAsync: function () {
          return this._impl.$v();
        },
        getUnderlyingTableDataAsync: function (e, bo) {
          return this._impl.$u(e, bo);
        },
        clearHighlightedMarksAsync: function () {
          return this._impl.$i();
        },
        highlightMarksAsync: function (e, bo) {
          return this._impl.$w(e, bo);
        },
        highlightMarksByPatternMatchAsync: function (e, bo) {
          return this._impl.$x(e, bo);
        },
        getHighlightedMarksAsync: function () {
          return this._impl.$q();
        },
        appendContextMenuAsync: function (e, bo) {
          return this._impl.$c(this.getName(), e, bo);
        },
        removeContextMenuAsync: function (e, bo) {
          return this._impl.$y(this.getName(), e, bo);
        },
        executeContextMenuAsync: function (e, bo) {
          return this._impl.$k(this.getName(), e, bo);
        },
      }
    ));
    ss.initClass(b);
    ss.initClass(c);
    ss.initClass(g);
    ss.initClass(d, g);
    ss.initClass(f);
    ss.initClass(h, Object);
    ss.initClass(i, g);
    ss.initClass(j);
    ss.initClass(k, Object);
    ss.initClass(l);
    ss.initClass(m);
    ss.initClass(n);
    ss.initClass(o);
    ss.initClass(p, g);
    ss.initClass(z);
    ss.initClass(q, z);
    ss.initClass(r, z);
    ss.initClass(s, z);
    ss.initClass(t, z);
    ss.initClass(u, z);
    ss.initClass(v);
    ss.initClass(w);
    ss.initClass(K);
    ss.initClass(x, K);
    ss.initClass(y, K);
    ss.initClass(R, K);
    ss.initClass(A, R);
    ss.initClass(B, K);
    ss.initClass(C, R);
    ss.initInterface(D, {
      add_customViewsListLoad: null,
      remove_customViewsListLoad: null,
      handleVizLoad: null,
      handleVizListening: null,
      sendScaleFactor: null,
    });
    ss.initClass(E);
    ss.initClass(F);
    ss.initClass(G, R);
    ss.initClass(H, K);
    ss.initClass(I);
    ss.initClass(J, K);
    ss.initClass(L, K);
    ss.initClass(M, K);
    ss.initClass(N, K);
    ss.initClass(O, null, [D]);
    ss.initClass(P, K);
    ss.initClass(Q, Object);
    ss.initClass(Y);
    ss.initClass(S, Y);
    ss.initClass(T);
    ss.initClass(bd);
    ss.initClass(U, bd);
    ss.initClass(V);
    ss.initClass(W);
    ss.initClass(X);
    ss.initClass(Z, Y);
    ss.initClass(ba);
    ss.initClass(bb, Y);
    ss.initClass(bc, Y);
    ss.initClass(be);
    ss.initClass(bf, bd);
    ss.initClass(bg);
    ss.initClass(bh);
    ss.initClass(bi);
    ss.initClass(bj);
    ss.initClass(bk);
    ss.initClass(bl);
    ss.initClass(bm);
    ss.initClass(bn, bd);
    (function () {
      m.$6 = [];
    })();
    (function () {
      g.noZoneId = 4294967295;
    })();
    (function () {
      p.$3 = new RegExp('\\[[^\\]]+\\]\\.', 'g');
    })();
    (function () {
      bj.$1 = new bj(2, 9, 1, 'null');
    })();
  })();
  window.tableau = window.tableauSoftware = global.tableauSoftware;
  tableauSoftware.Promise = tab._PromiseImpl;
  tab._Deferred = tab._DeferredImpl;
  tab._Collection = tab._CollectionImpl;
  tab._ApiBootstrap.initialize();
  window.tableau._apiLoaded = true;
})();
