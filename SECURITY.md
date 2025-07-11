# Security Policy

## Supported Versions

React CK follows semantic versioning and provides security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 2.x.x   | ✅ Yes             |
| 1.x.x   | ✅ Yes             |
| < 1.0   | ❌ No              |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you believe you have found a security vulnerability in React CK, please report it to us as described below.

### Reporting Process

1. **DO NOT** create a public GitHub issue for the vulnerability
2. **DO** email us at security@react-ck.js.org with the following information:
   - A clear description of the vulnerability
   - Steps to reproduce the issue
   - Potential impact assessment
   - Suggested fix (if any)

### What to Include

Please include as much of the following information as possible:

- **Component**: Which React CK component is affected
- **Version**: The version of React CK you're using
- **Environment**: Browser, OS, and React version
- **Steps**: Detailed steps to reproduce the issue
- **Impact**: What could an attacker do with this vulnerability
- **Proof of Concept**: Code or steps demonstrating the issue

### Response Timeline

- **Initial Response**: Within 48 hours
- **Assessment**: Within 5 business days
- **Fix Timeline**: Depends on severity and complexity
- **Public Disclosure**: After fix is available

## Security Measures

### Code Quality

- **Static Analysis**: All code is analyzed with ESLint and TypeScript
- **Dependency Scanning**: Regular security audits of dependencies
- **Code Review**: All changes require review before merging

### Testing

- **Unit Tests**: Comprehensive test coverage for all components
- **Integration Tests**: End-to-end testing of component interactions
- **Security Tests**: Specific tests for common security issues

### Dependencies

- **Regular Updates**: Dependencies are updated regularly
- **Vulnerability Scanning**: Automated scanning for known vulnerabilities
- **Minimal Dependencies**: Only essential dependencies are included

## Security Best Practices

### For Users

1. **Keep Updated**: Always use the latest stable version
2. **Audit Dependencies**: Run `npm audit` regularly
3. **Follow Guidelines**: Use components as documented
4. **Report Issues**: Report any security concerns immediately

### For Contributors

1. **Security Review**: All contributions are reviewed for security implications
2. **Best Practices**: Follow security best practices in code
3. **Testing**: Include security-relevant tests
4. **Documentation**: Document any security considerations

## Security Features

React CK includes several security-focused features:

- **XSS Protection**: Components are designed to prevent XSS attacks
- **Input Validation**: Built-in validation for user inputs
- **Accessibility**: Security through proper accessibility implementation
- **Type Safety**: TypeScript prevents many security-related bugs

## Disclosure Policy

### Responsible Disclosure

We follow responsible disclosure practices:

1. **Private Reporting**: Vulnerabilities are reported privately
2. **Assessment**: We assess and validate reported issues
3. **Fix Development**: We develop and test fixes
4. **Coordination**: We coordinate with reporters on disclosure
5. **Public Release**: We release fixes with appropriate disclosure

### Timeline

- **Critical**: Fix within 24-48 hours
- **High**: Fix within 1 week
- **Medium**: Fix within 2 weeks
- **Low**: Fix within 1 month

## Security Team

Our security team consists of:

- **Security Lead**: [Name] - security@react-ck.js.org
- **Core Maintainers**: Review all security-related issues
- **Community**: External security researchers and contributors

## Bug Bounty

While we don't currently offer a formal bug bounty program, we do recognize security researchers who report valid vulnerabilities:

- **Acknowledgments**: Credit in security advisories
- **Hall of Fame**: Recognition on our security page
- **Community Recognition**: Special thanks in release notes

## Security Resources

- **Security Advisories**: [GitHub Security Advisories](https://github.com/abelflopes/react-ck/security/advisories)
- **Dependency Updates**: [Dependabot Alerts](https://github.com/abelflopes/react-ck/security/dependabot)
- **Security Policy**: This document
- **Contact**: security@react-ck.js.org

---

**Thank you for helping keep React CK secure!** 🔒 